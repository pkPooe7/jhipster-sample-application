import { IAlien } from 'app/shared/model/alien.model';

export interface IWorld {
  id?: number;
  name?: string;
  aliens?: IAlien[];
}

export class World implements IWorld {
  constructor(public id?: number, public name?: string, public aliens?: IAlien[]) {}
}
