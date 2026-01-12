import { Injectable } from '@nestjs/common';
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { OptionEntity } from '../entities/option.entity';
import { OptionDto } from '../dto/option.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionDto } from '../dto/question.dto';

@Injectable()
export class QuestionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OptionEntity, OptionDto);
      createMap(mapper, QuestionEntity, QuestionDto);
    };
  }
}
