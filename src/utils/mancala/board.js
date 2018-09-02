/**
 * Creates 1 player's pits (aka 1/2 of the mancala board)
 * @return {Array} Array of pits
 */
export const freshPits = () => {
  const pits = new Array(6).fill({
    type: 'standard',
    stoneCount: 4
  });

  // push in the "store" pit
  pits.push({
    type: 'store',
    stoneCount: 0
  });

  return pits;
};

export const getTargetIndicies = (index, total, skipIndex) => {
  const indicies = [];
  let current = index;

  while (indicies.length < total) {
    const nextIndex = getNextIndex(current, skipIndex);
    indicies.push(nextIndex);
    current = nextIndex;
  }

  return indicies;
}

/**
 * calculates the next pit index
 * @param  {Number} index     current index
 * @param  {Number} skipIndex current skip index (based on current turn)
 * @return {Number}           next index
 */
export const getNextIndex = (index, skipIndex) => {
  let next = index + 1;

  if (next === skipIndex) {
    next = skipIndex + 1;
  }

  if (next > 13) {
    next = 0;
  }

  return next;
};
