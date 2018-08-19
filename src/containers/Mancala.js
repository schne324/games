import { Container } from 'unstated';
import { freshPits } from '../utils/mancala/board';

const pitMap = [
  [ 0, 1, 2, 3, 4, 5 ], // user
  [ 12, 11, 10, 9, 8, 7 ] // bot
];
const getCounterPit = i => Math.abs(i - 12);
const initialState = {
  status: 'not-started',
  pits: [ ...freshPits(), ...freshPits() ],
  current: 0
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
    const indicies = [];
    let current = index;
    while (indicies.length < initialStoneCount) {
      const nextIndex = this.getNextIndex(current);
      indicies.push(nextIndex);
      current = nextIndex;
    }
    // alter stone counts
    indicies.forEach(i => {
      updatedPits[i] = {
        ...updatedPits[i],
        stoneCount: updatedPits[i].stoneCount + 1
      }
    });

    updatedPits[index] = {
      ...updatedPits[index],
      stoneCount: updatedPits[index].stoneCount - initialStoneCount
    };

    const lastIndex = indicies[indicies.length - 1];
    const lastPit = updatedPits[lastIndex];
    const isStore = lastPit.type === 'store';
    const isOwnSide = pitMap[this.state.current].includes(lastIndex);

    if (isOwnSide && lastPit.stoneCount === 1) {
      const counter = getCounterPit(lastIndex);
      const counterPit = updatedPits[counter];

      if (!isStore && counterPit.stoneCount) {
        const sum = counterPit.stoneCount + lastPit.stoneCount;
        updatedPits[this.state.skipIndex === 6 ? 13 : 6] = {
          ...updatedPits[this.state.skipIndex === 6 ? 13 : 6],
          stoneCount: updatedPits[this.state.skipIndex === 6 ? 13 : 6].stoneCount + sum
        }

        updatedPits[counter] = {
          ...updatedPits[counter],
          stoneCount: 0
        };
        updatedPits[lastIndex] = {
          ...updatedPits[lastIndex],
          stoneCount: 0
        };
      }
    }

    this.setState({ pits: updatedPits });
    // TODO:
    // this.nextTurn(isStore);
  };

  /**
   * calculates the next pit index
   * @param  {Number} index current index
   * @return {Number}       next index
   */
  getNextIndex = index => {
    let next = index + 1;
    const { skipIndex } = this.state;

    if (next === skipIndex) {
      next = skipIndex + 1;
    }

    if (next > 13) {
      next = 0;
    }

    return next;
  };

  /**
   * Toggles current user
   * (0 = user)
   * (1 = computer)
   */
  nextTurn = shouldSkip => {
    if (shouldSkip) {
      return;
    }

    if (!this.state.pits.find(pit => pit.stoneCount)) { // end of game
      return this.setState({ status: 'ended' });
    }

    const { current } = this.state;
    this.setState({
      current: current ? 0 : 1,
      skipIndex: current ? 13 : 6
    });
  };
}
