import { Module } from '@nestjs/common';
import { PersonalitiesController } from './personalities.controller';
import { PersonalitiesService } from './personalities.service';
import { PersonalityProfile } from './mapper/personality.profile';
import { PersonalityRepository } from './repositories/personality.repository';

@Module({
  controllers: [PersonalitiesController],
  providers: [PersonalitiesService, PersonalityRepository, PersonalityProfile],
  exports: [PersonalitiesService, PersonalityRepository],
})
export class PersonalitiesModule {}
