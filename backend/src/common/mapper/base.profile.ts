import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BaseDto } from '../dto/base.dto';
export class BaseProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, BaseEntity, BaseDto);
    };
  }
}
