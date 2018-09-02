import * as React from 'react';
import * as th from './GamesLoader.sass';
import Button from 'shared/components/Button';

interface GamesLoaderProps {
  failed: boolean;
  fetching: boolean;
  onRequestMore: () => void;
  loadedGames: number;
  totalGames: number;
}

export default class GamesLoader extends React.Component<GamesLoaderProps> {
  handleClick (ev) {
    this.requestMoreGames();
  }

  requestMoreGames () {
    if (!this.props.fetching) {
      this.props.onRequestMore();
    }
  }

  render () {
    let { failed, fetching, loadedGames, totalGames } = this.props;
    let lastPage = totalGames === loadedGames;

    let el = null;
    if (failed) {
      el = 'Failed to load games';
    } else if (lastPage) {
      el = `All ${totalGames} games loaded`;
    } else if (fetching) {
      el = 'Fetching...';
    } else {
      el = (
        <Button disabled={fetching}>
          Load more games ({loadedGames}/{totalGames})
        </Button>
      );
    }

    return (
      <div
        ref='el'
        className={th.GamesLoader}
        onClick={this.handleClick.bind(this)}>
        <span className={th.GamesLoader__label}>
          { el }
        </span>
      </div>
    );
  }
}
