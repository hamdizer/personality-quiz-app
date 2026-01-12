import { Test, TestingModule } from '@nestjs/testing';
import { PersonalitiesController } from './personalities.controller';
import { PersonalitiesService } from './personalities.service';

describe('PersonalitiesController', () => {
  let controller: PersonalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalitiesController],
      providers: [PersonalitiesService],
    }).compile();

    controller = module.get<PersonalitiesController>(PersonalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
