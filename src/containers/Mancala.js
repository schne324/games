import { Container } from 'unstated';
import createDebug from '../utils/debug';
import { freshPits, getTargetIndicies } from '../utils/mancala/board';

const debug = createDebug('mancala:container');
const BOT_TIMEOUT = 2e3;
const pitMap = [
  [ 0, 1, 2, 3, 4, 5 ], // user
  [ 12, 11, 10, 9, 8, 7 ] // bot
];
const getCounterPit = i => Math.abs(i - 12);
const updateStoneCount = (target, increment) => ({
  ...target,
  stoneCount: target.stoneCount + increment
});
const initialState = {
  status: 'not-started',
  pits: [ ...freshPits(), ...freshPits() ],
  current: 0,
  log: []
};

export default class Mancala extends Container {
  state = initialState
  setStatus = status => this.setState({ status })
  reset = () => this.setState(initialState)

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

    if (isOwnSide && lastPit.stoneCount === 1) {
      const counter = getCounterPit(lastIndex);
      const counterPit = updatedPits[counter];

      if (!isStore && counterPit.stoneCount) {
        const sum = counterPit.stoneCount + lastPit.stoneCount;
        const idx = this.state.skipIndex === 6 ? 13 : 6;
        updatedPits[idx] = updateStoneCount(updatedPits[idx], sum);
        updatedPits[counter] = { ...updatedPits[counter], stoneCount: 0 };
        updatedPits[lastIndex] = { ...updatedPits[lastIndex], stoneCount: 0 };
      }
    }

    const msg = { index, user: this.state.current };

    this.setState({
      lastIndex,
      pits: updatedPits,
      log: [...this.state.log, msg]
    }, () => {
      debug(`
        ${this.state.current === 0 ? 'User' : 'Bot'} went on ${index}.
        Landed on ${lastIndex} (${lastPit.type})
      `);
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

    if (shouldSkip) {
      return current === 1 ? setTimeout(this.botTurn, BOT_TIMEOUT) : null;
    }

    if (!pitMap[current === 0 ? 1 : 0].find(pitdex => this.state.pits[pitdex].stoneCount)) {
      console.log(' DONE!!! here is where weshould empty pits ');
      return this.setState({ status: 'finished' });
    }

    if (!this.state.pits.find(pit => pit.stoneCount)) { // end of game
      return this.setState({ status: 'finished' });
    }

    const shouldBot = current === 0;
    this.setState({
      current: current ? 0 : 1,
      skipIndex: current ? 13 : 6
    }, () => {
      if (!shouldBot) { return; }

      setTimeout(this.botTurn, BOT_TIMEOUT);
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

    return this.setState({ status: 'finished' });
  };
}
