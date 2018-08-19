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
