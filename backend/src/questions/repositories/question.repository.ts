import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionEntity } from '../entities/question.entity';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<QuestionEntity[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: { order: 'asc' },
      include: {
        options: {
          orderBy: { order: 'asc' },
          include: {
            scores: true,
          },
        },
      },
    });

    return questions.map((question) => ({
      ...question,
      options: question.options.map((option) => ({
        ...option,
        scores: option.scores.reduce((acc, score) => {
          acc[score.personalityId] = score.points;
          return acc;
        }, {} as Record<number, number>),
      })),
    })) as QuestionEntity[];
  }

  async findById(id: number): Promise<QuestionEntity | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        options: {
          orderBy: { order: 'asc' },
          include: {
            scores: true,
          },
        },
      },
    });

    if (!question) return null;

    return {
      ...question,
      options: question.options.map((option) => ({
        ...option,
        scores: option.scores.reduce((acc, score) => {
          acc[score.personalityId] = score.points;
          return acc;
        }, {} as Record<number, number>),
      })),
    } as QuestionEntity;
  }
  async findByPubkey(pubkey: string): Promise<QuestionEntity | null> {
    const question = await this.prisma.question.findUnique({
      where: { pubkey },
      include: {
        options: {
          orderBy: { order: 'asc' },
          include: {
            scores: true,
          },
        },
      },
    });

    if (!question) return null;

    return {
      ...question,
      options: question.options.map((option) => ({
        ...option,
        scores: option.scores.reduce((acc, score) => {
          acc[score.personalityId] = score.points;
          return acc;
        }, {} as Record<number, number>),
      })),
    } as QuestionEntity;
  }
}
