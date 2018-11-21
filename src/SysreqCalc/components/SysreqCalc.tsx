import * as React from 'react';
import * as th from '../theme.sass';
import { connect } from 'react-redux';
import { actions } from 'redux-router5';
import { snapTo } from 'shared/lib/utils';
import Api, { Query } from 'src/Api';

import { AutoPage } from 'src/Layout';

import Chip from 'shared/components/Chip';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';

import SuggestionsBox from './SuggestionsBox';
import CalcResult from './CalcResult';

import { actions as filterActions, types as filterTypes } from 'src/FilterApp';

interface DispatchProps {
  setColumn: typeof filterActions.setColumn;
  setQuery: typeof filterActions.setQuery;
  setSort: typeof filterActions.setSort;
  navigateTo: typeof actions.navigateTo;
}

interface SysreqCalcState {
  games: filterTypes.Game[];
}

@(connect<{}, DispatchProps>(() => ({}), {
  setColumn: filterActions.setColumn,
  setQuery: filterActions.setQuery,
  setSort: filterActions.setSort,
  navigateTo: actions.navigateTo
}) as any)
export default class SysreqCalc extends React.Component<DispatchProps, SysreqCalcState> {
  state: SysreqCalcState = {
    games: []
  };

  filterGames = (value) => {
    if (!value) return [];

    let query: Query = {
      params: {
        name: { value: value }
      },
      columns: ['name', 'sysreq_index_pct'],
      sort: {
        column: 'name',
        asc: true
      }
    };

    return Api.games.index({
      filter: JSON.stringify(query),
      limit: 8,
      page: 0
    })
    .then(({data: games}) => {
      let ids = this.state.games.map((g) => g.id);
      return games
        .filter((game) => ids.indexOf(game.id) === -1)
        .map((game) => [`${game.name} [${game.sysreq_index_pct}]`, game]);
    })
  }

  selectGame = (game) => {
    this.state.games.push(game);
    this.state.games.sort((g1, g2) => g2['sysreq_index_pct'] - g1['sysreq_index_pct']);
    this.setState({games: this.state.games});
    this.refs.box['clean']();
  }

  removeGame = (game) => {
    this.state.games.splice(this.state.games.indexOf(game), 1);
    this.setState({games: this.state.games});
  }

  submitFilter = () => {
    let calcs = this.calculatedValues();
    if (!calcs.mean) return;
    let lt = Math.min(100, calcs.mean + calcs.deviation);
    this.props.setColumn('SystemRequirements', true);
    this.props.setQuery('SystemRequirements', {gt: 0, lt: snapTo(lt, 5)});
    this.props.setSort('SystemRequirements', false);
    this.props.navigateTo('filterRedirect');
  }

  calculatedValues () {
    let games = this.state.games;
    if (!games.length) return {}
    if (games.length === 1) return {mean: games[0]['sysreq_index_pct'], deviation: 10};

    let values = games.map(g => g['sysreq_index_pct']);
    let len = values.length;
    let sum = values.reduce((a, b) => a + b, 0);
    let mean = sum / len;
    let squaredDistanceFromTheMean = values.map((a) => (mean - a) * (mean - a));
    let variance = squaredDistanceFromTheMean.reduce((a, b) => a + b, 0) / len;
    let deviation = Math.sqrt(variance);

    return {
      mean: Math.round(mean),
      deviation: Math.round(deviation)
    };
  }

  handleChange = (value) => {
    this.setState({games: value});
  }

  render () {
    let calcs = this.calculatedValues();
    let { games } = this.state;

    return (
      <AutoPage className={th.sysreqCalc} card title='System Requirements Calculator'>
        <SuggestionsBox
          ref='box'
          filter={this.filterGames}
          onSelect={this.selectGame}
          placeholder='Type the most resource-intensive games your computer can run'/>
        {games.length ? (
          <div className={th.chips}>
            {games.map((game, i) => (
              <Chip
                key={game.id}
                iconText={game['sysreq_index_pct']}
                onRemove={this.removeGame.bind(this, game)}
                className={th.SysreqCalc__Chip}>
                {game['name']}
              </Chip>
            ))}
          </div>
        ) : null}
        {calcs.mean ? (
          <CalcResult mean={calcs.mean} deviation={calcs.deviation}/>
        ) : null}
        <p className={th.info}>
          The System Requirements Index is a very coarse number
          that we are working on improving.
          It's <Link to='aboutSysreq'>calculated by an automated algorithm</Link>.
        </p>
        <div className={th.actionBar}>
          <Button
            label='Apply filter'
            disabled={!calcs.mean}
            onClick={this.submitFilter}/>
        </div>
      </AutoPage>
    );
  }
}
