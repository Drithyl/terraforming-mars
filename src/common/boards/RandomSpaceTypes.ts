import {SpaceType} from './SpaceType';
import {Random} from '../utils/Random';
import {randomWeighedIndex} from '../utils/utils';

export default class RandomSpaceTypes {
  private types: SpaceType[] = [];
  private weights: number[] = [];

  constructor() {
  }

  land(weight: number): RandomSpaceTypes {
    this.types.push(SpaceType.LAND);
    this.weights.push(weight);
    return this;
  }

  ocean(weight: number): RandomSpaceTypes {
    this.types.push(SpaceType.OCEAN);
    this.weights.push(weight);
    return this;
  }

  generate(rng: Random): SpaceType {
    const selectedIndex: number = randomWeighedIndex(rng, this.weights);
    return this.types[selectedIndex];
  }
}
