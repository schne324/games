import debug from 'debug';

export default function createDebug(namespace) {
  return debug(`a11y-games:${namespace}`);
}
