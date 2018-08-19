import rando from './rando';

/**
 * Utility for rolling dice. Returns an array (of provided length)
 * filled with a random number between 1 and 6.
 */
export default function (n) {
  return new Array(n).fill('').map(() => rando(1, 6));
}
