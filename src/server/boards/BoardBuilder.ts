import {Space, newSpace} from './Space';
import {SpaceId} from '../../common/Types';
import {SpaceBonus} from '../../common/boards/SpaceBonus';
import {SpaceName} from '../SpaceName';
import {SpaceType} from '../../common/boards/SpaceType';
import {Random} from '../../common/utils/Random';
import {randomFromArray} from '../../common/utils/utils';

function colonySpace(id: SpaceId): Space {
  return newSpace(id, SpaceType.COLONY, -1, -1, []);
}

export class BoardBuilder {
  // This builder assumes the map has nine rows, of tile counts [5,6,7,8,9,8,7,6,5].
  //
  // "Son I am able, " she said "though you scare me."
  // "Watch, " said I
  // "Beloved, " I said "watch me scare you though." said she,
  // "Able am I, Son."

  private spaceTypes: Array<SpaceType> = [];
  private bonuses: Array<Array<SpaceBonus>> = [];
  private spaces: Array<Space> = [];
  private unshufflableSpaces: Array<number> = [];

  constructor(private includeVenus: boolean, private includePathfinders: boolean, private equatorLength: number = 9) {
    this.spaces.push(colonySpace(SpaceName.GANYMEDE_COLONY));
    this.spaces.push(colonySpace(SpaceName.PHOBOS_SPACE_HAVEN));
  }

  ocean(...bonus: Array<SpaceBonus>): this {
    this.spaceTypes.push(SpaceType.OCEAN);
    this.bonuses.push(bonus);
    return this;
  }

  cove(...bonus: Array<SpaceBonus>): this {
    this.spaceTypes.push(SpaceType.COVE);
    this.bonuses.push(bonus);
    return this;
  }

  land(...bonus: Array<SpaceBonus>): this {
    this.spaceTypes.push(SpaceType.LAND);
    this.bonuses.push(bonus);
    return this;
  }

  randomTerrain(rng:Random, types: Array<SpaceType>, ...bonus: Array<SpaceBonus>): this {
    const randomTerrain = randomFromArray<SpaceType>(rng, (types.length) ? types : [SpaceType.LAND]);
    this.spaceTypes.push(randomTerrain);
    this.bonuses.push(bonus);
    return this;
  }

  restricted(): this {
    this.spaceTypes.push(SpaceType.RESTRICTED);
    this.bonuses.push([]);
    return this;
  }

  doNotShuffleLastSpace(): this {
    this.unshufflableSpaces.push(this.spaceTypes.length - 1);
    return this;
  }

  build(): Array<Space> {
    const tilesPerRow = this.getTilesPerRow(this.equatorLength);
    const rowCountHalved = Math.floor(this.equatorLength / 2);

    let idx = 0;

    for (let row = 0; row < tilesPerRow.length; row++) {
      const tilesInThisRow = tilesPerRow[row];
      const xOffset = tilesPerRow.length - tilesInThisRow;
      for (let i = 0; i < tilesInThisRow; i++) {
        const spaceId = 100 + idx;
        const xCoordinate = xOffset + i;
        const yRelativeToEquator = rowCountHalved - row;
        const space = newSpace(BoardBuilder.spaceId(spaceId), this.spaceTypes[idx], xCoordinate, row, this.bonuses[idx]);
        space.yRelativeToEquator = yRelativeToEquator;
        space.equatorLength = this.equatorLength;
        this.spaces.push(space);
        idx++;
      }
    }

    this.spaces.push(colonySpace(SpaceName.STANFORD_TORUS));
    if (this.includeVenus) {
      this.spaces.push(
        colonySpace(SpaceName.DAWN_CITY),
        colonySpace(SpaceName.LUNA_METROPOLIS),
        colonySpace(SpaceName.MAXWELL_BASE),
        colonySpace(SpaceName.STRATOPOLIS),
      );
    }
    if (this.includePathfinders) {
      this.spaces.push(
        // Space.colony(SpaceName.MARTIAN_TRANSHIPMENT_STATION),
        colonySpace(SpaceName.CERES_SPACEPORT),
        colonySpace(SpaceName.DYSON_SCREENS),
        colonySpace(SpaceName.LUNAR_EMBASSY),
        colonySpace(SpaceName.VENERA_BASE),
      );
    }

    return this.spaces;
  }

  public shuffleArray(rng: Random, array: Array<Object>): void {
    this.unshufflableSpaces.sort((a, b) => a < b ? a : b);
    // Reversing the indexes so the elements are pulled from the right.
    // Reversing the result so elements are listed left to right.
    const spliced = this.unshufflableSpaces.reverse().map((idx) => array.splice(idx, 1)[0]).reverse();
    for (let i = array.length - 1; i > 0; i--) {
      const j = rng.nextInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    for (let idx = 0; idx < this.unshufflableSpaces.length; idx++) {
      array.splice(this.unshufflableSpaces[idx], 0, spliced[idx]);
    }
  }

  // Shuffle the ocean spaces and bonus spaces. But protect the land spaces supplied by
  // |lands| so that those IDs most definitely have land spaces.
  public shuffle(rng: Random, ...lands: Array<SpaceName>) {
    this.shuffleArray(rng, this.spaceTypes);
    this.shuffleArray(rng, this.bonuses);
    let safety = 0;
    while (safety < 1000) {
      let satisfy = true;
      for (const land of lands) {
        // Why -3?
        const land_id = Number(land) - 3;
        while (this.spaceTypes[land_id] === SpaceType.OCEAN) {
          satisfy = false;
          const idx = rng.nextInt(this.spaceTypes.length);
          [this.spaceTypes[land_id], this.spaceTypes[idx]] = [this.spaceTypes[idx], this.spaceTypes[land_id]];
        }
      }
      if (satisfy) return;
      safety++;
    }
    throw new Error('infinite loop detected');
  }

  private static spaceId(id: number): SpaceId {
    let strId = id.toString();
    if (id < 10) {
      strId = '0'+strId;
    }
    // OK to cast this.
    return strId as SpaceId;
  }

  private getTilesPerRow(equatorLength:number): Array<number> {
    const tilesPerRow = [equatorLength];
    let i = 1;

    while (tilesPerRow.length < equatorLength) {
      tilesPerRow.unshift(equatorLength-i);
      tilesPerRow.push(equatorLength-i);
      i++;
    }

    return tilesPerRow;
  }
}
