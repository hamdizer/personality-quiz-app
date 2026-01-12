import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizRepository } from 'src/quiz/repositories/quiz.repository';
import { QuizProfile } from './mapper/quiz.mapper';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizRepository, QuizProfile],
  exports: [QuizService, QuizRepository],
})
export class QuizModule {}
