import {Random} from '../../common/utils/Random';
import {BoardBuilder} from './BoardBuilder';
import {RandomSpaceBonusPossibilities, SpaceBonus} from '../../common/boards/SpaceBonus';
import RandomSpaceTypes from '../../common/boards/RandomSpaceTypes';

const RANDOM_SPACE_TYPES = new RandomSpaceTypes()
  .land(80)
  .ocean(20);

const RANDOM_BONUSES: RandomSpaceBonusPossibilities = new RandomSpaceBonusPossibilities(
  {
    type: null,
    minPerTile: 0,
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
    minPerTile: 0,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.TITANIUM,
    minPerTile: 0,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.MEGACREDITS,
    minPerTile: 0,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.DRAW_CARD,
    minPerTile: 0,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.HEAT,
    minPerTile: 0,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.ENERGY,
    minPerTile: 0,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.MICROBE,
    minPerTile: 0,
    maxPerTile: 2,
    weight: 10,
  },
  {
    type: SpaceBonus.ANIMAL,
    minPerTile: 0,
    maxPerTile: 1,
    weight: 10,
  },
  {
    type: SpaceBonus.SCIENCE,
    minPerTile: 0,
    maxPerTile: 1,
    weight: 10,
  },
  {
    type: SpaceBonus.OCEAN,
    minPerTile: 0,
    maxPerTile: 1,
    weight: 5,
  },
);

export default function increaseSize(rng: Random, builder: BoardBuilder, sizeIncrease: number) {
  builder.padRandom(rng, sizeIncrease, RANDOM_SPACE_TYPES, RANDOM_BONUSES);
}
