import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getQuestionsForScoring() {
    return await this.prisma.question.findMany({
      orderBy: { order: 'asc' },
      include: {
        options: {
          orderBy: { order: 'asc' },
          include: {
            scores: {
              include: {
                option: false,
              },
            },
          },
        },
      },
    });
  }

  async getAllPersonalities() {
    return await this.prisma.personality.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async questionExists(questionId: number): Promise<boolean> {
    const count = await this.prisma.question.count({
      where: { id: questionId },
    });
    return count > 0;
  }

  async optionExistsForQuestion(
    questionId: string,
    optionId: string,
  ): Promise<boolean> {
    const count = await this.prisma.option.count({
      where: {
        pubkey: optionId,
        question: { pubkey: questionId },
      },
    });
    return count > 0;
  }

  async getOptionScoring(optionId: number) {
    return await this.prisma.option.findUnique({
      where: { id: optionId },
      include: {
        scores: true,
        question: {
          select: {
            weight: true,
          },
        },
      },
    });
  }

  async validateAnswers(
    answers: Array<{ questionId: string; optionId: string }>,
  ) {
    const validations = await Promise.all(
      answers.map(async (answer) => {
        const isValid = await this.optionExistsForQuestion(
          answer.questionId,
          answer.optionId,
        );
        return {
          questionId: answer.questionId,
          optionId: answer.optionId,
          isValid,
        };
      }),
    );

    return validations;
  }

  async getPersonalityById(id: number) {
    return await this.prisma.personality.findUnique({
      where: { id },
    });
  }

  /**
   * Optional: Store quiz results for analytics
   * Uncomment if you want to track user submissions
   */
  /*
  async saveQuizResult(data: {
    personalityId: number;
    totalScore: number;
    answers: any;
  }) {
    return await this.prisma.quizResult.create({
      data: {
        personalityId: data.personalityId,
        totalScore: data.totalScore,
        answers: data.answers,
        completedAt: new Date(),
      },
    });
  }
  */
}
