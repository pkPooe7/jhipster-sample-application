import { IDominantHand } from 'app/shared/model/dominant-hand.model';
import { IAlien } from 'app/shared/model/alien.model';
import { ITechnology } from 'app/shared/model/technology.model';

export interface IClassification {
  id?: number;
  name?: string;
  handed?: string;
  dominantHand?: IDominantHand;
  alien?: IAlien;
  raceNames?: ITechnology[];
}

export class Classification implements IClassification {
  constructor(
    public id?: number,
    public name?: string,
    public handed?: string,
    public dominantHand?: IDominantHand,
    public alien?: IAlien,
    public raceNames?: ITechnology[]
  ) {}
}
