import { AutoMap } from '@automapper/classes';
import { Personality } from '@prisma/client';
import { BaseEntity } from 'src/common/entities/base.entity';

export class PersonalityEntity extends BaseEntity implements Personality {
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  color: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
