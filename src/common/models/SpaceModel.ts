import {Color} from '../Color';
import {TileType} from '../TileType';
import {SpaceBonus} from '../boards/SpaceBonus';
import {SpaceType} from '../boards/SpaceType';
import {SpaceId} from '../Types';
import {UndergroundResourceToken} from '../underworld/UndergroundResourceToken';

export type SpaceHighlight = undefined | 'noctis' | 'volcanic';

export type SpaceModel = {
  id: SpaceId;
  x: number;
  y: number;
  yRelativeToEquator?: number; // Absent or a number
  equatorLength?: number; // Absent or a number
  spaceType: SpaceType;

  bonus: Array<SpaceBonus>;
  color?: Color;
  tileType?: TileType;
  highlight?: SpaceHighlight;
  rotated?: true; // Absent or true
  gagarin?: number; // 0 means current
  cathedral?: true; // Absent or true
  nomads?: true; // Absent or true
  coOwner?: Color;

  undergroundResources?: UndergroundResourceToken;
  excavator?: Color;
}
