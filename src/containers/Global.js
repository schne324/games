import { Container } from 'unstated';

export default class Global extends Container {
  state = { username: localStorage.username || null, games: localStorage.games || [] };
  addGame = game => this.setState({ games: this.state.games.concat(game) });
  clearGames = () => this.setState({ games: [] });
  setUsername = username => {
    this.setState({ username });
    localStorage.username = username;
  };
}
