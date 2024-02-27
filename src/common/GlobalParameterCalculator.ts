import * as constants from './constants';
import {IGame} from '../server/IGame';
import {BoardName} from './boards/BoardName';
import {BigBoard} from '../server/boards/BigBoard';
import {GameOptionsModel} from './models/GameOptionsModel';
import {GameOptions} from '@/server/game/GameOptions';

function isBigGame(game: IGame): boolean;
function isBigGame(gameOptions: GameOptions | GameOptionsModel): boolean;

// If this is a non-big game, all global values will be as defined in constants
function isBigGame(gameOrOptions: any): boolean {
  if (gameOrOptions.gameOptions !== undefined) {
    return gameOrOptions.gameOptions.boardName === BoardName.BIG;
  } else {
    return gameOrOptions.boardName === BoardName.BIG;
  }
}

// BASE CONSTANTS
export function getCardCost(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.CARD_COST;
  }
  return constants.CARD_COST;
}

export function getMilestoneCost(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MILESTONE_COST;
  }
  return constants.MILESTONE_COST;
}

export function getMaxMilestones(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_MILESTONES;
  }
  return constants.MAX_MILESTONES;
}

export function getAwardCost(game: IGame): number[] {
  if (isBigGame(game) === false) {
    return constants.AWARD_COSTS;
  }
  return constants.AWARD_COSTS;
}

export function getMaxAwards(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_AWARDS;
  }
  return constants.MAX_AWARDS;
}

export function getDefaultSteelValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DEFAULT_STEEL_VALUE;
  }
  return constants.DEFAULT_STEEL_VALUE;
}

export function getDefaultTitaniumValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DEFAULT_TITANIUM_VALUE;
  }
  return constants.DEFAULT_TITANIUM_VALUE;
}

export function getFloatersValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.FLOATERS_VALUE;
  }
  return constants.FLOATERS_VALUE;
}

export function getMicrobesValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MICROBES_VALUE;
  }
  return constants.MICROBES_VALUE;
}

export function getOceanBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.OCEAN_BONUS;
  }
  return constants.OCEAN_BONUS;
}


// GLOBAL PARAMETERS
export function getHeatForTemperature(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.HEAT_FOR_TEMPERATURE;
  }
  return constants.HEAT_FOR_TEMPERATURE;
}

export function getMaxOceanTiles(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_OCEAN_TILES;
  }
  // One more ocean for each player
  return constants.MAX_OCEAN_TILES + game.getPlayers().length;
}

export function getMinTemperature(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MIN_TEMPERATURE;
  }
  return constants.MIN_TEMPERATURE;
}

export function getMaxTemperature(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_TEMPERATURE;
  }
  // One more temperature step for each player
  return constants.MAX_TEMPERATURE + game.getPlayers().length;
}

export function getMinOxygenLevel(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MIN_OXYGEN_LEVEL;
  }
  return constants.MIN_OXYGEN_LEVEL;
}

export function getMaxOxygenLevel(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_OXYGEN_LEVEL;
  }
  // One more oxygen step for every additional equator length
  // over the default 9, as well as for each player
  const board: BigBoard = game.board as BigBoard;
  const sizeOverVanilla = board.equatorLength - 9;
  return constants.MAX_OXYGEN_LEVEL + sizeOverVanilla + game.getPlayers().length;
}

export function getMinVenusScale(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MIN_VENUS_SCALE;
  }
  return constants.MIN_VENUS_SCALE;
}

export function getMaxVenusScale(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_VENUS_SCALE;
  }
  // One more venus step for each player
  return constants.MAX_VENUS_SCALE + game.getPlayers().length;
}


// GLOBAL PARAMETER BONUSES
export function getOxygenLevelForTemperatureBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.OXYGEN_LEVEL_FOR_TEMPERATURE_BONUS;
  }
  return constants.OXYGEN_LEVEL_FOR_TEMPERATURE_BONUS;
}

export function getTemperatureForOceanBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.TEMPERATURE_FOR_OCEAN_BONUS;
  }
  return constants.TEMPERATURE_FOR_OCEAN_BONUS;
}

export function getVenusLevelForCardBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.VENUS_LEVEL_FOR_CARD_BONUS;
  }
  return constants.VENUS_LEVEL_FOR_CARD_BONUS;
}

export function getVenusLevelForTRBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.VENUS_LEVEL_FOR_TR_BONUS;
  }
  return constants.VENUS_LEVEL_FOR_TR_BONUS;
}

export function getAltVenusMinimumBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.ALT_VENUS_MINIMUM_BONUS;
  }
  return constants.ALT_VENUS_MINIMUM_BONUS;
}

export function getTemperatureBonusForHeat1(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.TEMPERATURE_BONUS_FOR_HEAT_1;
  }
  return constants.TEMPERATURE_BONUS_FOR_HEAT_1;
}

export function getTemperatureBonusForHeat2(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.TEMPERATURE_BONUS_FOR_HEAT_2;
  }
  return constants.TEMPERATURE_BONUS_FOR_HEAT_2;
}


// COLONIES
export function getMaxColonyTrackPosition(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_COLONY_TRACK_POSITION;
  }
  return constants.MAX_COLONY_TRACK_POSITION;
}

export function getMaxColoniesPerTile(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_COLONIES_PER_TILE;
  }
  return constants.MAX_COLONIES_PER_TILE;
}

export function getMaxFleetSize(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAX_FLEET_SIZE;
  }
  return constants.MAX_FLEET_SIZE;
}

export function getMCTradeCost(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MC_TRADE_COST;
  }
  return constants.MC_TRADE_COST;
}

export function getEnergyTradeCost(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.ENERGY_TRADE_COST;
  }
  return constants.ENERGY_TRADE_COST;
}

export function getTitaniumTradeCost(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.TITANIUM_TRADE_COST;
  }
  return constants.TITANIUM_TRADE_COST;
}


// TURMOIL
export function getDelegatesPerPlayer(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DELEGATES_PER_PLAYER;
  }
  return constants.DELEGATES_PER_PLAYER;
}

export function getDelegatesForNeutralPlayer(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DELEGATES_FOR_NEUTRAL_PLAYER;
  }
  return constants.DELEGATES_FOR_NEUTRAL_PLAYER;
}

export function getRedsRulingPolicyCost(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.REDS_RULING_POLICY_COST;
  }
  return constants.REDS_RULING_POLICY_COST;
}

export function getPoliticalAgenasMaxActionUses(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.POLITICAL_AGENDAS_MAX_ACTION_USES;
  }
  return constants.POLITICAL_AGENDAS_MAX_ACTION_USES;
}


// PROMO
export function getGrapheneValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.GRAPHENE_VALUE;
  }
  return constants.GRAPHENE_VALUE;
}


// MOON
export function getMaxHabitatRate(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAXIMUM_HABITAT_RATE;
  }
  return constants.MAXIMUM_HABITAT_RATE;
}

export function getMaxMiningRate(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAXIMUM_MINING_RATE;
  }
  return constants.MAXIMUM_MINING_RATE;
}

export function getMaxLogisticsRate(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.MAXIMUM_LOGISTICS_RATE;
  }
  return constants.MAXIMUM_LOGISTICS_RATE;
}


// PATHFINDERS
export function getSeedValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.SEED_VALUE;
  }
  return constants.SEED_VALUE;
}

export function getDataValue(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DATA_VALUE;
  }
  return constants.DATA_VALUE;
}


// ESCAPE VELOCITY
export function getDefaultEscapeVelocityThreshold(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DEFAULT_ESCAPE_VELOCITY_THRESHOLD;
  }
  return constants.DEFAULT_ESCAPE_VELOCITY_THRESHOLD;
}

export function getDefaultEscapeVelocityBonusSeconds(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DEFAULT_ESCAPE_VELOCITY_BONUS_SECONDS;
  }
  return constants.DEFAULT_ESCAPE_VELOCITY_BONUS_SECONDS;
}

export function getDefaultEscapeVelocityPeriod(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DEFAULT_ESCAPE_VELOCITY_PERIOD;
  }
  return constants.DEFAULT_ESCAPE_VELOCITY_PERIOD;
}

export function getDefaultEscapeVelocityPenalty(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.DEFAULT_ESCAPE_VELOCITY_PENALTY;
  }
  return constants.DEFAULT_ESCAPE_VELOCITY_PENALTY;
}

export function getBonusSecondsPerAction(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.BONUS_SECONDS_PER_ACTION;
  }
  return constants.BONUS_SECONDS_PER_ACTION;
}

// LEADERS/CEOs
export function getAsimovAwardBonus(game: IGame): number {
  if (isBigGame(game) === false) {
    return constants.ASIMOV_AWARD_BONUS;
  }
  return constants.ASIMOV_AWARD_BONUS;
}
