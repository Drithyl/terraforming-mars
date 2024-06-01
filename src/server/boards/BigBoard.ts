import {RandomSpaceBonus, SpaceBonus} from '../../common/boards/SpaceBonus';
import {SpaceName} from '../SpaceName';
import {Board} from './Board';
import {CanAffordOptions, IPlayer} from '../IPlayer';
import {Space} from './Space';
import {BoardBuilder} from './BoardBuilder';
import {SerializedBoard} from './SerializedBoard';
import {Random} from '../../common/utils/Random';
import {GameOptions} from '../game/GameOptions';
import {SpaceId} from '../../common/Types';
import {MarsBoard} from './MarsBoard';
import {SpaceType} from '../../common/boards/SpaceType';
import {randomWeighedIndex} from '../../common/utils/utils';

const RANDOM_BONUSES: Array<RandomSpaceBonus> = [
  {
    type: null,
    maxPerTile: 1,
    weight: 25,
  },
  {
    type: SpaceBonus.PLANT,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.STEEL,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.TITANIUM,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.MEGACREDITS,
    maxPerTile: 3,
    weight: 20,
  },
  {
    type: SpaceBonus.DRAW_CARD,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.HEAT,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.ENERGY,
    maxPerTile: 3,
    weight: 15,
  },
  {
    type: SpaceBonus.MICROBE,
    maxPerTile: 2,
    weight: 10,
  },
  {
    type: SpaceBonus.ANIMAL,
    maxPerTile: 1,
    weight: 10,
  },
  {
    type: SpaceBonus.SCIENCE,
    maxPerTile: 1,
    weight: 10,
  },
  {
    type: SpaceBonus.OCEAN,
    maxPerTile: 1,
    weight: 5,
  },
];

export class BigBoard extends MarsBoard {
  public static newInstance(gameOptions: GameOptions, rng: Random): BigBoard {
    const equatorLength = 11;
    const builder = new BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion, equatorLength);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const TWO_PLANTS = [PLANT, PLANT];
    const RANDOM_TILES = [SpaceType.LAND, SpaceType.OCEAN];

    // y=0
    builder
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=1
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(STEEL, STEEL).ocean(STEEL, STEEL).land().ocean(DRAW_CARD).ocean()
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=2
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land().land(STEEL).land().land().land().ocean(DRAW_CARD, DRAW_CARD)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=3
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(DRAW_CARD).land().land().land().land().land().land(STEEL)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=4
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(PLANT, TITANIUM).land(PLANT).land(PLANT).land(PLANT).land(...TWO_PLANTS).land(PLANT).land(PLANT).ocean(PLANT, PLANT)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=5
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS).ocean(...TWO_PLANTS).ocean(...TWO_PLANTS)
      .ocean(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=6
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(PLANT).land(...TWO_PLANTS).land(PLANT).land(PLANT).land(PLANT).ocean(PLANT).ocean(PLANT).ocean(PLANT)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=7
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land().land().land().land().land().land(PLANT).land()
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=8
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(STEEL, STEEL).land().land(DRAW_CARD).land(DRAW_CARD).land().land(TITANIUM)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=9
    builder.randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .land(STEEL).land(STEEL, STEEL).land().land().ocean(TITANIUM, TITANIUM)
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    // y=10
    builder
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES))
      .randomTerrain(rng, RANDOM_TILES, ...BigBoard.randomBonus(rng, RANDOM_BONUSES));

    if (gameOptions.shuffleMapOption) {
      builder.shuffle(rng, SpaceName.HECATES_THOLUS, SpaceName.ELYSIUM_MONS, SpaceName.ARSIA_MONS_ELYSIUM, SpaceName.OLYMPUS_MONS);
    }
    const spaces = builder.build();
    return new BigBoard(spaces, equatorLength);
  }

  public static randomBonus(rng: Random, bonuses: Array<RandomSpaceBonus>): Array<SpaceBonus> {
    const weights = bonuses.map((b) => b.weight);
    const selectedIndex = randomWeighedIndex(rng, weights);
    const selectedBonus = bonuses[selectedIndex];
    const randomAmount = Math.floor(rng.next() * selectedBonus.maxPerTile + 1);

    return new Array(randomAmount).fill(selectedBonus.type);
  }

  public static deserialize(board: SerializedBoard, players: Array<IPlayer>): BigBoard {
    return new BigBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public override getNonReservedLandSpaces(): ReadonlyArray<Space> {
    return super.getNonReservedLandSpaces().filter((space) => space.id !== SpaceName.NOCTIS_CITY);
  }

  public override getAvailableSpacesOnLand(player: IPlayer, canAffordOptions?: CanAffordOptions): ReadonlyArray<Space> {
    return super.getAvailableSpacesOnLand(player, canAffordOptions).filter((space) => space.id !== SpaceName.NOCTIS_CITY);
  }

  public override canPlaceTile(space: Space): boolean {
    return super.canPlaceTile(space) && space.id !== SpaceName.NOCTIS_CITY;
  }

  public override getVolcanicSpaceIds(): Array<SpaceId> {
    return [
      SpaceName.ARSIA_MONS_ELYSIUM,
      SpaceName.ELYSIUM_MONS,
      SpaceName.HECATES_THOLUS,
      SpaceName.OLYMPUS_MONS,
    ];
  }

  public override getNoctisCitySpaceId() {
    return SpaceName.NOCTIS_CITY;
  }
}
