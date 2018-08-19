import {
  total,
  totalOfType,
  scoreStraight,
  scoreOfAKind,
  getOccurances,
  grandTotal
} from './scorers';
import rando from './rando';

const multi = n => n * rando(1, 4);
const upperBonus = card => grandTotal(card.upper) > 62 ? 35 : 0;
const odds = percentage => Math.random() < (percentage / 100);

export default {
  upper: {
    ones: {
      name: 'Aces',
      description: 'Total 1\'s',
      score: dice => totalOfType(dice, 1),
      bot: () => rando(0, 5)
    },
    twos: {
      name: 'Twos',
      description: 'Total 2\'s',
      score: dice => totalOfType(dice, 2),
      bot: () => multi(2)
    },
    threes: {
      name: 'Threes',
      description: 'Total 3\'s',
      score: dice => totalOfType(dice, 3),
      bot: () => multi(3)
    },
    fours: {
      name: 'Fours',
      description: 'Total 4\'s',
      score: dice => totalOfType(dice, 4),
      bot: () => multi(4)
    },
    fives: {
      name: 'Fives',
      description: 'Total 5\'s',
      score: dice => totalOfType(dice, 5),
      bot: () => multi(5)
    },
    sixes: {
      name: 'Sixes',
      description: 'Total 6\'s',
      score: dice => totalOfType(dice, 6),
      bot: () => multi(6)
    },
    bonus: {
      automatic: true,
      name: 'Bonus',
      description: 'If total 63 or more',
      score: (_, card) => upperBonus(card)
    }
  },
  lower: {
    'three-of-a-kind': {
      name: '3 of a kind',
      description: 'Total dice',
      score: dice => scoreOfAKind(dice, 3),
      bot: () => odds(50) ? rando(8, 30) : rando(15, 30)
    },
    'four-of-a-kind': {
      name: '4 of a kind',
      description: 'Total dice',
      score: dice => scoreOfAKind(dice, 4),
      bot: () => odds(50) ? rando(12, 30) : rando(20, 30)
    },
    'full-house': {
      name: 'Full house',
      description: 'Score 25',
      score: dice => {
        const occurances = getOccurances(dice);
        return occurances[0] >= 3 && occurances[occurances.length - 1] >= 2
          ? 25
          : 0;
      },
      bot: () => odds(70) ? 25 : 0
    },
    'small-straight': {
      name: 'Small Straight',
      description: 'Score 30',
      score: dice => scoreStraight(dice, /1234|2345|3456/, 30),
      bot: () => odds(70) ? 30 : 0
    },
    'large-straight': {
      name: 'Large Straight',
      description: 'Score 40',
      score: dice => scoreStraight(dice, /12345|23456/, 40),
      bot: () => odds(60) ? 40 : 0
    },
    chance: {
      name: 'Chance',
      description: 'Total dice',
      score: total,
      bot: () => rando(5, 30)
    },
    yahtzee: {
      name: 'Yahtzee',
      description: '5 of a kind',
      score: dice => scoreOfAKind(dice, 5, 50),
      bot: () => odds(33) ? 50 : 0
    },
    'lower-total': {
      automatic: true,
      name: 'Lower total',
      description: 'Total of Lower Section',
      score: (_, card) => grandTotal(card.lower)
    },
    'upper-total': {
      automatic: true,
      name: 'Upper total',
      description: 'Total of Upper Section',
      score: (_, card) => grandTotal(card.upper) + upperBonus(card)
    },
    'grand-total': {
      automatic: true,
      name: 'Grand total',
      description: 'Lower total + Upper total',
      score: (_, card) => (
        card.lower['upper-total'].score(null, card)
          + card.lower['lower-total'].score(null, card)
      )
    }
  }
};
