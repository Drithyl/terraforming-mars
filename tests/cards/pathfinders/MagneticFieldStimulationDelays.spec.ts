import {expect} from 'chai';
import {setTemperature, setOxygenLevel} from '../../TestingUtils';
import {IGame} from '../../../src/server/IGame';
import {MagneticFieldStimulationDelays} from '../../../src/server/cards/pathfinders/MagneticFieldStimulationDelays';
import {testGame} from '../../TestingUtils';

describe('MagneticFieldStimulationDelays', function() {
  let card: MagneticFieldStimulationDelays;
  let game: IGame;

  beforeEach(function() {
    card = new MagneticFieldStimulationDelays();
    [game/* , player */] = testGame(1);
  });

  it('resolve play', function() {
    setTemperature(game, -30);
    setOxygenLevel(game, 0);

    card.resolve(game);

    expect(game.getTemperature()).to.eq(-30);
    expect(game.getOxygenLevel()).to.eq(0);

    setTemperature(game, -28);
    setOxygenLevel(game, 1);

    card.resolve(game);

    expect(game.getTemperature()).to.eq(-30);
    expect(game.getOxygenLevel()).to.eq(0);

    setTemperature(game, -26);
    setOxygenLevel(game, 2);

    card.resolve(game);

    expect(game.getTemperature()).to.eq(-30);
    expect(game.getOxygenLevel()).to.eq(0);

    setTemperature(game, -24);
    setOxygenLevel(game, 3);

    card.resolve(game);

    expect(game.getTemperature()).to.eq(-28);
    expect(game.getOxygenLevel()).to.eq(1);
  });

  it('cannot reduce temperature if maxed out', function() {
    setTemperature(game, game.gameOptions.maxTemperature);
    setOxygenLevel(game, 5);

    card.resolve(game);

    expect(game.getTemperature()).to.eq(game.gameOptions.maxTemperature);
    expect(game.getOxygenLevel()).to.eq(3);
  });

  it('cannot reduce oxygen if maxed out', function() {
    setTemperature(game, 0);
    setOxygenLevel(game, game.gameOptions.maxOxygen);

    card.resolve(game);

    expect(game.getTemperature()).to.eq(-4);
    expect(game.getOxygenLevel()).to.eq(game.gameOptions.maxOxygen);
  });
});
