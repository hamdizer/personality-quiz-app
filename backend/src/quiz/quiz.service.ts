import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SubmitAnswersDto } from './dto/submit-answer.dto';
import { QuizResultEntity } from './entities/quiz-result.entity';
import { PersonalityEntity } from '../personalities/entities/personality.entity';
import { QuizResultDto } from './dto/quiz-result.dto';
import { QuizRepository } from './repositories/quiz.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async submitAnswers(submitDto: SubmitAnswersDto): Promise<QuizResultDto> {
    const { answers } = submitDto;

    const validations = await this.quizRepository.validateAnswers(answers);
    const invalidAnswer = validations.find((v) => !v.isValid);

    if (invalidAnswer) {
      throw new BadRequestException(
        `Invalid answer: questionId=${invalidAnswer.questionId}, optionId=${invalidAnswer.optionId}`,
      );
    }

    const questions = await this.quizRepository.getQuestionsForScoring();
    const questionMap = new Map(questions.map((q) => [q.pubkey, q]));

    const personalityScores = new Map<number, number>();

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);
      if (!question) continue;

      const option = question.options.find((o) => o.pubkey === answer.optionId);
      if (!option) continue;

      for (const score of option.scores) {
        const currentScore = personalityScores.get(score.personalityId) || 0;
        personalityScores.set(
          score.personalityId,
          currentScore + question.weight * score.points,
        );
      }
    }

    let maxScore = 0;
    let topPersonalityId = 0;

    for (const [personalityId, score] of personalityScores.entries()) {
      if (
        score > maxScore ||
        (score === maxScore && personalityId < topPersonalityId)
      ) {
        maxScore = score;
        topPersonalityId = personalityId;
      }
    }

    const personalities = await this.quizRepository.getAllPersonalities();
    const topPersonality = personalities.find((p) => p.id === topPersonalityId);

    if (!topPersonality) {
      throw new BadRequestException('Could not determine personality type');
    }

    const totalScore = Array.from(personalityScores.values()).reduce(
      (a, b) => a + b,
      0,
    );

    if (totalScore === 0) {
      throw new BadRequestException('Invalid scoring calculation');
    }

    const scoreEntities: any[] = personalities
      .map((personality) => {
        const score = personalityScores.get(personality.id) || 0;
        return {
          personality: personality as PersonalityEntity,
          score,
          percentage: Math.round((score / totalScore) * 100),
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.personality.id - b.personality.id;
      });

    const resultEntity: any = {
      personality: topPersonality as PersonalityEntity,
      scores: scoreEntities,
    };

    return this.mapper.map(resultEntity, QuizResultEntity, QuizResultDto);
  }

  async getQuizStatistics() {
    const questions = await this.quizRepository.getQuestionsForScoring();
    const personalities = await this.quizRepository.getAllPersonalities();

    return {
      totalQuestions: questions.length,
      totalPersonalities: personalities.length,
      totalWeight: questions.reduce((sum, q) => sum + q.weight, 0),
    };
  }
}
