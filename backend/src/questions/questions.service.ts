import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { QuestionDto } from './dto/question.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionRepository } from './repositories/question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly repository: QuestionRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<QuestionDto[]> {
    const entities = await this.repository.findAll();
    return this.mapper.mapArray(entities, QuestionEntity, QuestionDto);
  }

  async findById(id: number): Promise<QuestionDto> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return this.mapper.map(entity, QuestionEntity, QuestionDto);
  }
}
