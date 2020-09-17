export const total = dice => dice.map(d => d.value).reduce((a, b) => a + b, 0);

export const totalOfType = (dice, target) => (
  dice.filter(d => d.value === target).length * target
);

export const scoreStraight = (dice, reg, pts) => {
  const valueString = dice
    .map(d => d.value)
    .filter((v, i, a) => i === a.indexOf(v))
    .sort()
    .join('');

  return reg.test(valueString) ? pts : 0;
};

export const getOccurances = dice => (
  dice
    .map(die => dice.filter(d => die.value === d.value).length)
    .sort()
    .reverse()
);

export const scoreOfAKind = (dice, min, pts) => {
  const occurances = getOccurances(dice).sort((a, b) => b - a);
  return occurances[0] >= min ? (pts || total(dice)) : 0;
};

export const grandTotal = data => (
  Object.values(data).reduce((acc, current) => {
    const { value = 0 } = current;
    return acc + value;
  }, 0)
);
