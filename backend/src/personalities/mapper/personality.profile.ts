import { Injectable } from '@nestjs/common';
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { PersonalityEntity } from '../entities/personality.entity';
import { PersonalityDto } from '../dto/personality.dto';

@Injectable()
export class PersonalityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PersonalityEntity, PersonalityDto);
      createMap(mapper, PersonalityDto, PersonalityEntity);
    };
  }
}
