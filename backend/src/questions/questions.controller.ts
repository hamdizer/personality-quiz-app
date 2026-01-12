import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { QuestionsService } from './questions.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/questions')
@ApiTags('api/questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Get()
  async findAll(): Promise<QuestionDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<QuestionDto> {
    return this.service.findById(id);
  }
}
