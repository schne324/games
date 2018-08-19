import { Container } from 'unstated';
import scoreCard from '../utils/yahtzee/score-card';
import roll from '../utils/yahtzee/roll';
import rando from '../utils/yahtzee/rando';

const initialState = {
  roll: 0,
  dice: new Array(5).fill(0).map(value => ({ held: false, value })),
  card: {
    user: { ...scoreCard },
    computer: { ...scoreCard }
  },
  status: 'not-started'
};

export default class Yahtzee extends Container {
  state = initialState

  setStatus = status => this.setState({ status })

  reset = () => this.setState(initialState)

  rollDice = () => {
    const newDice = this.state.dice.map(d => {
      if (d.held) { return d; }
      // roll a new number
      return { ...d, value: roll(1)[0] };
    });

    this.setState({
      roll: this.state.roll + 1,
      dice: newDice
    });
  }

  toggleDie = index => {
    const { dice } = this.state;
    const die = dice[index];

    if (die.value === 0) { return; }

    die.held = !die.held;
    this.setState({ dice });
  };

  setScore = (type, scope, key, value) => {
    const { card: { user, computer } } = this.state;
    const empties = Object.entries({
      ...computer.upper,
      ...computer.lower
    }).filter(([ _, data ]) => {
      return typeof data.value === 'undefined' && !data.automatic;
    });
    const [ compKey ] = empties[rando(0, empties.length - 1)];
    const compScope = computer.lower[compKey] ? 'lower' : 'upper';

    this.setState({
      card: {
        user: {
          ...user,
          [scope]: {
            ...user[scope],
            [key]: {
              ...user[scope][key],
              value
            }
          }
        },
        computer: {
          ...computer,
          [compScope]: {
            ...computer[compScope],
            [compKey]: {
              ...computer[compScope][compKey],
              value: computer[compScope][compKey].bot()
            }
          }
        }
      },
      dice: new Array(5).fill(0).map(value => ({ held: false, value })),
      roll: 0
    });

    if (empties.length === 1) {
      this.setStatus('finished');
    }
  };
}
