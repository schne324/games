import { Container } from 'unstated';
import createDebug from '../utils/debug';
import { freshPits, getTargetIndicies } from '../utils/mancala/board';

const BOT_TIMEOUT = 2e3;
const debug = createDebug('mancala:container');
const pitMap = [
  [ 0, 1, 2, 3, 4, 5 ], // user
  [ 12, 11, 10, 9, 8, 7 ] // bot
];
const getCounterPit = i => Math.abs(i - 12);
const updateStoneCount = (target, increment) => ({
  ...target,
  stoneCount: target.stoneCount + increment
});
const initialStateFactory = () => ({
  status: 'not-started',
  pits: [ ...freshPits(), ...freshPits() ],
  current: 0,
  log: [],
  lastIndex: null,
  ...JSON.parse(localStorage.mancalaState || '{}')
})


export default class Mancala extends Container {
  state = initialStateFactory();
  setStatus = status => this.setState({ status }, this.setLocalStorage);
  reset = () => {
    localStorage.mancalaState = null;
    this.setState(initialStateFactory(), this.setLocalStorage)
  };

  constructor() {
    super();

    if (this.state.current === 1) {
      this.botTurn();
    }
    debug('welcome to mancala: ', this.state);
  }

  /**
   * Automates a turn by taking target pit's
   * stones and distributing them properly
   */
  go = index => {
    const updatedPits = [...this.state.pits]; // fresh clone
    const initialStoneCount = updatedPits[index].stoneCount;

    // calculate which indicies will be affected
    const indicies = getTargetIndicies(
      index, initialStoneCount, this.state.skipIndex
    );

    // alter stone counts
    indicies.forEach(i => {
      updatedPits[i] = updateStoneCount(updatedPits[i], 1);
    });

    updatedPits[index] = updateStoneCount(updatedPits[index], (0 - initialStoneCount));

    const lastIndex = indicies[indicies.length - 1];
    const lastPit = updatedPits[lastIndex];
    const isStore = lastPit.type === 'store';
    const isOwnSide = this.isOwnSide(lastIndex);
    const msg = {
      index, lastIndex, isStore, user: this.state.current, stolen: false
    };

    // check if landed on an empty pit on own side
    if (isOwnSide && lastPit.stoneCount === 1) {
      const counter = getCounterPit(lastIndex);
      const counterPit = updatedPits[counter];

      if (!isStore && counterPit.stoneCount) { // Steal!
        const sum = counterPit.stoneCount + lastPit.stoneCount;
        const idx = this.state.skipIndex === 6 ? 13 : 6;
        updatedPits[idx] = updateStoneCount(updatedPits[idx], sum);
        updatedPits[counter] = { ...updatedPits[counter], stoneCount: 0 };
        updatedPits[lastIndex] = { ...updatedPits[lastIndex], stoneCount: 0 };
        msg.stolen = true;
      }
    }

    this.setState({
      lastIndex,
      pits: updatedPits,
      log: [...this.state.log, msg]
    }, () => {
      debug(`
        ${this.state.current === 0 ? 'User' : 'Bot'} went on ${index}.
        Landed on ${lastIndex} (${lastPit.type})
      `);
      this.setLocalStorage();
      this.nextTurn(isStore);
    });
  };

  /**
   * Determines if index (of pit) is on current player's "own" side
   */
  isOwnSide = index => pitMap[this.state.current].includes(index);

  /**
   * Toggles current user
   * (0 = user)
   * (1 = computer)
   */
  nextTurn = shouldSkip => {
    const { current } = this.state;

    if (this.isFinished()) {
      return this.setState({
        pits: this.pitRake()
      }, () => {
        const newState = { status: 'finished' };
        this.setLocalStorage(newState);
        return setTimeout(() => this.setState(newState), BOT_TIMEOUT);
      });
    }

    if (shouldSkip) {
      return current === 1 ? setTimeout(this.botTurn, BOT_TIMEOUT) : null;
    }

    const shouldBot = current === 0;
    this.setState({
      current: current ? 0 : 1,
      skipIndex: current ? 13 : 6
    }, () => {
      if (!shouldBot) { return; }

      setTimeout(this.botTurn, BOT_TIMEOUT);
      this.setLocalStorage();
    });
  };

  /**
   * TODO:
   * - Bot strategy improvements:
   *    • Check if move would leave vulnerable next turn
   */
  botTurn = () => {
    let inStore, stealer, rando;
    const pits = [...this.state.pits];

    for (let i = 7; i < 13; i++) {
      const { stoneCount } = pits[i];
      const distance = 13 - i;
      const indicies = getTargetIndicies(i, stoneCount, this.state.skipIndex);
      const lastIndex = indicies[indicies.length - 1];
      const lastPit = pits[lastIndex];
      const counterPit = pits[getCounterPit(lastIndex)];
      const canSteal = counterPit && !this.isOwnSide(lastIndex) && (
        counterPit.stoneCount.length && !lastPit.stoneCount.length
      );

      if (distance === stoneCount) {
        inStore = i;
      } else if (canSteal) {
        stealer = i;
      } else if (stoneCount) {
        rando = i;
      }
    }

    if (typeof inStore !== 'undefined') {
      return this.go(inStore);
    } else if (typeof stealer !== 'undefined') {
      return this.go(stealer);
    } else if (typeof rando !== 'undefined') {
      return this.go(rando);
    }

    return this.setState({ status: 'finished' }, this.setLocalStorage);
  };

  setLocalStorage = (force = {}) => {
    const updatedState = { ...this.state, ...force };
    debug('updating localStorage.mancalaState', updatedState);
    localStorage.mancalaState = JSON.stringify(updatedState);
  }

  /**
   * The game is finished under if either player has 0 on the board
   * @return {Boolean}
   */
  isFinished() {
    const { pits } = this.state;
    return pitMap.find(map => map.every(i => !pits[i].stoneCount))
  }

  pitRake() {
    const pits = [...this.state.pits];
    pitMap.forEach((map, i) => {
      const storeIndex = i === 0 ? 6 : 13;
      const storeTotal = map.reduce((acc, val) => {
        const pit = pits[val];
        debug({ acc, val, pit });
        acc += pit.stoneCount;
        pits[val] = { ...pit, stoneCount: 0 }
        return acc;
      }, 0);

      debug(
        `adding ${storeTotal} to ${storeIndex === 6 ? 'users' : 'bots'} store currently`,
        {...pits[storeIndex]}
      );

      pits[storeIndex] = updateStoneCount(pits[storeIndex], storeTotal);
    });

    return pits;
  }
}
