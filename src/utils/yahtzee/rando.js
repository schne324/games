/**
 * Returns a random number between `start` and `end`
 */
export default function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
