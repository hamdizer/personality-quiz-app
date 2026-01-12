// src/quiz/quiz.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitAnswersDto } from './dto/submit-answer.dto';
import { QuizResultDto } from './dto/quiz-result.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/quiz')
@ApiTags('api/quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Post('submit')
  async submit(@Body() submitDto: SubmitAnswersDto): Promise<QuizResultDto> {
    return this.service.submitAnswers(submitDto);
  }
}
