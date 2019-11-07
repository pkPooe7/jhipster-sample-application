import { IWorld } from 'app/shared/model/world.model';

export interface IAlien {
  id?: number;
  name?: string;
  homeWorld?: IWorld;
}

export class Alien implements IAlien {
  constructor(public id?: number, public name?: string, public homeWorld?: IWorld) {}
}
