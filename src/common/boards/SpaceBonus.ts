// There might be a temptation to rename or reorder these, but SpaceBonus is stored in the database
// as its number. Would have been better if this was stored as a string, but that ship has sailed,
// for now.

import {Random} from '../utils/Random';
import {randomWeighedIndex} from '../utils/utils';

export enum SpaceBonus {
    TITANIUM, // 0
    STEEL, // 1
    PLANT, // 2
    DRAW_CARD, // 3
    HEAT, // 4
    OCEAN, // 5

    // Ares-specific
    MEGACREDITS, // 6
    ANIMAL, // 7 (Also used in Amazonis)
    MICROBE, // 8 (Also used in Arabia Terra)
    ENERGY, // 9 // Ares and Terra Cimmeria

    // Arabia Terra-specific
    DATA, // 10
    SCIENCE, // 11
    ENERGY_PRODUCTION, // 12

    // Vastitas Borealis-specific
    TEMPERATURE, // 13
    // Amazonis-specific
    _RESTRICTED, // 14
    ASTEROID, // 15 // Used by Deimos Down Ares
}

const TO_STRING_MAP: Record<SpaceBonus, string> = {
  [SpaceBonus.TITANIUM]: 'Titanium',
  [SpaceBonus.STEEL]: 'Steel',
  [SpaceBonus.PLANT]: 'Plant',
  [SpaceBonus.DRAW_CARD]: 'Card',
  [SpaceBonus.HEAT]: 'Heat',
  [SpaceBonus.OCEAN]: 'Ocean',
  [SpaceBonus.MEGACREDITS]: 'M€',
  [SpaceBonus.ANIMAL]: 'Animal',
  [SpaceBonus.MICROBE]: 'Microbe',
  [SpaceBonus.ENERGY]: 'Energy',
  [SpaceBonus.DATA]: 'Data',
  [SpaceBonus.SCIENCE]: 'Science',
  [SpaceBonus.ENERGY_PRODUCTION]: 'Energy Production',
  [SpaceBonus.TEMPERATURE]: 'Temperature',
  [SpaceBonus._RESTRICTED]: 'UNUSED',
  [SpaceBonus.ASTEROID]: 'Asteroid',
};

export namespace SpaceBonus {
  export function toString(spaceBonus: SpaceBonus): string {
    return TO_STRING_MAP[spaceBonus];
  }
}

/**
 * Describes a random space bonus - its type (PLANT, STEEL, etc.),
 * the maximum number of said bonus on a single space on Mars,
 * and the weight it should have when being randomized with others,
 * expressed as a number between 0 and 1.
 */
export type RandomSpaceBonus = {
  type: SpaceBonus|null,
  minPerTile: number,
  maxPerTile: number,
  weight: number,
};

/**
 * Describes a list of possible random space bonuses to pick from.
 */
export class RandomSpaceBonusPossibilities {
  possibilities: Array<RandomSpaceBonus>;

  constructor(...bonuses: Array<RandomSpaceBonus>) {
    this.possibilities = bonuses;
  }

  pickRandom(rng: Random): Array<SpaceBonus> {
    const weights = this.possibilities.map((b) => b.weight);
    const selectedIndex = randomWeighedIndex(rng, weights);
    const selectedBonus = this.possibilities[selectedIndex];
    const randomAmount = Math.floor(rng.next() * (selectedBonus.maxPerTile - selectedBonus.minPerTile) + selectedBonus.minPerTile);

    return new Array(randomAmount).fill(selectedBonus.type);
  }

  pickNRandom(rng: Random, numberOfBonusesToPick: number): Array<SpaceBonus> {
    const bonuses = new Array(numberOfBonusesToPick);

    for (let i = 0; i < numberOfBonusesToPick; i++) {
      bonuses[i] = this.pickRandom(rng);
    }

    return bonuses;
  }
}
