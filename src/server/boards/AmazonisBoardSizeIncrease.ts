import {Random} from '../../common/utils/Random';
import {BoardBuilder} from './BoardBuilder';
import {RandomSpaceBonusPossibilities, SpaceBonus} from '../../common/boards/SpaceBonus';
import {SpaceType} from '../../common/boards/SpaceType';

const RANDOM_SPACE_TYPES = [SpaceType.LAND, SpaceType.OCEAN];
const RANDOM_BONUSES: RandomSpaceBonusPossibilities = new RandomSpaceBonusPossibilities(
  {
    type: null,
    minPerTile: 1,
    maxPerTile: 1,
    weight: 25,
  },
  {
    type: SpaceBonus.PLANT,
    minPerTile: 3,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.STEEL,
    minPerTile: 1,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.TITANIUM,
    minPerTile: 1,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.MEGACREDITS,
    minPerTile: 1,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.DRAW_CARD,
    minPerTile: 1,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.HEAT,
    minPerTile: 1,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.ENERGY,
    minPerTile: 1,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.MICROBE,
    minPerTile: 1,
    maxPerTile: 2,
    weight: 10,
  },
  {
    type: SpaceBonus.ANIMAL,
    minPerTile: 1,
    maxPerTile: 1,
    weight: 10,
  },
  {
    type: SpaceBonus.SCIENCE,
    minPerTile: 1,
    maxPerTile: 1,
    weight: 10,
  },
  {
    type: SpaceBonus.OCEAN,
    minPerTile: 1,
    maxPerTile: 1,
    weight: 5,
  },
);

export default function increaseSize(rng: Random, builder: BoardBuilder, sizeIncrease: number) {
  builder.padRandom(rng, sizeIncrease, RANDOM_SPACE_TYPES, RANDOM_BONUSES);
}
