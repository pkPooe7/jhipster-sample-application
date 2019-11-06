export interface IAlien {
  id?: number;
  name?: string;
  homePlanet?: string;
}

export class Alien implements IAlien {
  constructor(public id?: number, public name?: string, public homePlanet?: string) {}
}
