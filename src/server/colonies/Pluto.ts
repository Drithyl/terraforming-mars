import {Colony} from './Colony';
import {ColonyName} from '../../common/colonies/ColonyName';
import {ColonyBenefit} from '../../common/colonies/ColonyBenefit';
import {Resource} from '../../common/Resource';

export class Pluto extends Colony {
  constructor() {
    super({
      name: ColonyName.PLUTO,
      description: [
        'Draw 2 cards',
        'Draw n cards',
        'Gain 2 M€',
      ],

      buildType: ColonyBenefit.DRAW_CARDS,
      buildQuantity: [2, 2, 2],
      tradeType: ColonyBenefit.DRAW_CARDS,
      tradeQuantity: [0, 1, 2, 2, 3, 3, 4],
      colonyBonusType: ColonyBenefit.GAIN_RESOURCES,
      colonyBonusQuantity: 2,
      colonyBonusResource: Resource.MEGACREDITS,
    });
  }
}
