import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PersonalityDto } from './dto/personality.dto';
import { PersonalityEntity } from './entities/personality.entity';
import { PersonalityRepository } from './repositories/personality.repository';

@Injectable()
export class PersonalitiesService {
  constructor(
    private readonly repository: PersonalityRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async findAll(): Promise<PersonalityDto[]> {
    const entities = await this.repository.findAll();
    return this.mapper.mapArray(entities, PersonalityEntity, PersonalityDto);
  }

  async findById(id: number): Promise<PersonalityDto> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException(`Personality with ID ${id} not found`);
    }

    return this.mapper.map(entity, PersonalityEntity, PersonalityDto);
  }
  async findByPubkey(pubkey: number): Promise<PersonalityDto> {
    const entity = await this.repository.findById(pubkey);

    if (!entity) {
      throw new NotFoundException(`Personality with ID ${pubkey} not found`);
    }

    return this.mapper.map(entity, PersonalityEntity, PersonalityDto);
  }
}
