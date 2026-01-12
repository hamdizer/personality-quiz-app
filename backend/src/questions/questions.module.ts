import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionProfile } from './mapper/question.profile';
import { QuestionRepository } from './repositories/question.repository';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository, QuestionProfile],
  exports: [QuestionsService, QuestionRepository],
})
export class QuestionsModule {}
