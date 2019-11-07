import { IClassification } from 'app/shared/model/classification.model';
import { Hands } from 'app/shared/model/enumerations/hands.model';

export interface IDominantHand {
  id?: number;
  hand?: Hands;
  primaryHand?: IClassification;
}

export class DominantHand implements IDominantHand {
  constructor(public id?: number, public hand?: Hands, public primaryHand?: IClassification) {}
}
