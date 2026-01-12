import { ConfigModule } from '@nestjs/config';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { PersonalitiesModule } from './personalities/personalities.module';
import { QuizModule } from './quiz/quiz.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CommonModule,
    PrismaModule,
    QuestionsModule,
    PersonalitiesModule,
    QuizModule,
  ],
})
export class AppModule {}
