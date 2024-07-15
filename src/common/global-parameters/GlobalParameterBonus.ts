import {Phase} from '../Phase';
import {GlobalParameter} from './GlobalParameter';
import GlobalParameterBonusEnum from './GlobalParameterBonusEnum';

export type GlobalParameterBonus = {
    parameter: GlobalParameter,
    threshold: number,
    bonusType: GlobalParameterBonusEnum,
    amount: number,
    phase?: Phase,
    cssClass: string,
};

export const GLOBAL_PARAMETER_BONUSES: GlobalParameterBonus[] = [
  {
    parameter: GlobalParameter.TEMPERATURE,
    threshold: -24,
    bonusType: GlobalParameterBonusEnum.HEAT_PRODUCTION,
    amount: 1,
    cssClass: 'global-temperature-bonus-heat-production-1',
  },
  {
    parameter: GlobalParameter.TEMPERATURE,
    threshold: -20,
    bonusType: GlobalParameterBonusEnum.HEAT_PRODUCTION,
    amount: 1,
    cssClass: 'global-temperature-bonus-heat-production-2',
  },
  {
    parameter: GlobalParameter.TEMPERATURE,
    threshold: 0,
    bonusType: GlobalParameterBonusEnum.OCEAN,
    amount: 1,
    cssClass: 'global-temperature-bonus-ocean',
  },
  {
    parameter: GlobalParameter.OXYGEN,
    threshold: 8,
    bonusType: GlobalParameterBonusEnum.TEMPERATURE,
    amount: 1,
    cssClass: 'global-oxygen-bonus-temperature',
  },
  {
    parameter: GlobalParameter.VENUS,
    threshold: 8,
    bonusType: GlobalParameterBonusEnum.DRAW_CARD,
    amount: 1,
    cssClass: 'global-venus-bonus-card',
  },
  {
    parameter: GlobalParameter.VENUS,
    threshold: 16,
    bonusType: GlobalParameterBonusEnum.TERRAFORMING,
    amount: 1,
    cssClass: 'global-venus-bonus-terraforming',
  },
];

export function getGlobalParameterBonus(parameter: GlobalParameter, value: number): GlobalParameterBonus|undefined {
  return GLOBAL_PARAMETER_BONUSES.find((bonus) => {
    return parameter === bonus.parameter && value === bonus.threshold;
  });
}

export function getBonusesForParameterIncrease(parameter: GlobalParameter, lastValue: number, newValue: number): GlobalParameterBonus[] {
  return GLOBAL_PARAMETER_BONUSES.filter((bonus) => {
    return parameter === bonus.parameter && lastValue < bonus.threshold && newValue >= bonus.threshold;
  });
}
