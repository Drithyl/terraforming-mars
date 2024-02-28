import {expect} from 'chai';
import {cast, setVenusScaleLevel} from '../../TestingUtils';
import {MorningStarInc} from '../../../src/server/cards/venusNext/MorningStarInc';
import {RotatorImpacts} from '../../../src/server/cards/venusNext/RotatorImpacts';
import {Game} from '../../../src/server/Game';
import {OrOptions} from '../../../src/server/inputs/OrOptions';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestGame';

describe('RotatorImpacts', () => {
  let card: RotatorImpacts;
  let player: TestPlayer;
  let game: Game;

  beforeEach(() => {
    card = new RotatorImpacts();
    [game, player] = testGame(2);
  });

  it('Cannot play', () => {
    setVenusScaleLevel(game, 16);
    expect(player.simpleCanPlay(card)).is.not.true;
  });

  it('Can play', () => {
    setVenusScaleLevel(game, 14);
    expect(player.simpleCanPlay(card)).is.true;
  });

  it('Should play', () => {
    expect(player.simpleCanPlay(card)).is.true;
    cast(card.play(player), undefined);
  });

  it('Works with MSI corporation', () => {
    const corp = new MorningStarInc();
    corp.play(player);
    player.setCorporationForTest(corp);

    setVenusScaleLevel(game, 18);
    expect(player.simpleCanPlay(card)).is.true;
  });

  it('Should act', () => {
    player.playedCards.push(card);
    player.megaCredits = 16;
    player.titanium = 2;

    // only one possible action: add resource to card
    expect(card.resourceCount).to.eq(0);
    expect(card.canAct(player)).is.true;

    card.action(player);
    expect(card.resourceCount).to.eq(1);

    // two possible actions: add resource or spend titanium
    const orOptions = cast(card.action(player), OrOptions);
    orOptions.options[0].cb();
    expect(card.resourceCount).to.eq(0);
    expect(game.getVenusScaleLevel()).to.eq(2);
  });

  it('Should not allow to raise Venus level if there no resources on card', () => {
    player.playedCards.push(card);
    player.megaCredits = 5;
    expect(card.canAct(player)).is.not.true;
  });

  it('Should allow to raise Venus level only', () => {
    player.playedCards.push(card);
    card.resourceCount = 1;
    expect(card.canAct(player)).is.true;

    const action = card.action(player);
    cast(action, undefined);
    expect(card.resourceCount).to.eq(0);
    expect(game.getVenusScaleLevel()).to.eq(2);
  });

  it('Should not allow to raise Venus level if Venus level is maxed out', () => {
    player.playedCards.push(card);
    card.resourceCount = 1;

    setVenusScaleLevel(game, game.gameOptions.maxVenus);
    expect(card.canAct(player)).is.not.true;
  });
});
