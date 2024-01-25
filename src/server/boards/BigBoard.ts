import {SpaceBonus} from '../../common/boards/SpaceBonus';
import {SpaceName} from '../SpaceName';
import {Board} from './Board';
import {BoardBuilder} from './BoardBuilder';
import {SerializedBoard} from './SerializedBoard';
import {IPlayer} from '../IPlayer';
import {Random} from '../../common/utils/Random';
import {GameOptions} from '../game/GameOptions';
import {SpaceId} from '../../common/Types';
import {MarsBoard} from './MarsBoard';

export class BigBoard extends MarsBoard {
  public static newInstance(gameOptions: GameOptions, rng: Random): BigBoard {
    const equatorLength = 11;
    const builder = new BoardBuilder(gameOptions.venusNextExtension, gameOptions.pathfindersExpansion, equatorLength);

    const PLANT = SpaceBonus.PLANT;
    // const STEEL = SpaceBonus.STEEL;
    // const DRAW_CARD = SpaceBonus.DRAW_CARD;
    // const TITANIUM = SpaceBonus.TITANIUM;

    for (let i = 0; i < 91; i++) {
      builder.land(PLANT);
    }

    if (gameOptions.shuffleMapOption) {
      builder.shuffle(rng, SpaceName.HECATES_THOLUS, SpaceName.ELYSIUM_MONS, SpaceName.ARSIA_MONS_ELYSIUM, SpaceName.OLYMPUS_MONS);
    }
    const spaces = builder.build();
    return new BigBoard(spaces, equatorLength);
  }

  public static deserialize(board: SerializedBoard, players: Array<IPlayer>): BigBoard {
    return new BigBoard(Board.deserializeSpaces(board.spaces, players));
  }

  public override getVolcanicSpaceIds(): Array<SpaceId> {
    return [
      SpaceName.ARSIA_MONS_ELYSIUM,
      SpaceName.ELYSIUM_MONS,
      SpaceName.HECATES_THOLUS,
      SpaceName.OLYMPUS_MONS,
    ];
  }
}
