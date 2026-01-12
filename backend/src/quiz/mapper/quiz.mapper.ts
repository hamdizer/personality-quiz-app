// src/quiz/quiz.mapper.ts
import { Injectable } from '@nestjs/common';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { PersonalityScoreDto, QuizResultDto } from '../dto/quiz-result.dto';
import {
  PersonalityScoreEntity,
  QuizResultEntity,
} from '../entities/quiz-result.entity';
import { PersonalityEntity } from 'src/personalities/entities/personality.entity';
import { PersonalityDto } from 'src/personalities/dto/personality.dto';

@Injectable()
export class QuizProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        PersonalityScoreEntity,
        PersonalityScoreDto,
        forMember(
          (dest) => dest.personality,
          mapFrom((src) =>
            mapper.map(src.personality, PersonalityEntity, PersonalityDto),
          ),
        ),
        forMember(
          (dest) => dest.score,
          mapFrom((src) => src.score),
        ),
        forMember(
          (dest) => dest.percentage,
          mapFrom((src) => src.percentage),
        ),
      );

      createMap(
        mapper,
        QuizResultEntity,
        QuizResultDto,
        forMember(
          (dest) => dest.personality,
          mapFrom((src) =>
            mapper.map(src.personality, PersonalityEntity, PersonalityDto),
          ),
        ),
        forMember(
          (dest) => dest.scores,
          mapFrom((src) =>
            mapper.mapArray(
              src.scores,
              PersonalityScoreEntity,
              PersonalityScoreDto,
            ),
          ),
        ),
      );
    };
  }
}
