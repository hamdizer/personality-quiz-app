import { AutoMap } from '@automapper/classes';
import { randomUUID } from 'crypto';

export class BaseEntity {
  id: number;

  @AutoMap()
  pubkey: string;

  deletedAt: Date;

  constructor() {
    this.pubkey = randomUUID();
  }
}
