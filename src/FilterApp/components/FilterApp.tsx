import * as React from 'react';
import * as th from './FilterApp.sass';
import { connect } from 'react-redux';

import definitions, { FiltersNames }  from '../../Definitions';

import * as a from '../filter/actions';
import { FiltersConfiguration, Game } from '../filter';
import * as filterSel from '../filter/selectors';

import Table from './Table/Table';
import GamesLoader from './GamesLoader';
import CategoriesList from './CategoriesList';
import QueryChipsList from './QueryChipsList';
import SfilterBar from './SfilterBar';
import FrontPageFilters from './FrontPageFilters';
import FiltersPanel from './FiltersPanel';
import Configurator from './Configurator';

import { AppBar } from 'src/Layout';
import { Dispatch } from '../../../node_modules/redux';

interface StateProps {
  games: Game[][];
  gamesTotalCount: number;
  gamesLoadedCount: number;
  gamesLoading: boolean;
  gamesFailed: boolean;
  configuration: FiltersConfiguration;
  tags: string[];
}

interface DispatchProps {
  getGames: (page: number) => {};
  setQuery: (filter: FiltersNames, query: object) => void;
  setColumn: (filter: FiltersNames, column: boolean) => void;
  setHl: (filter: FiltersNames, hl: boolean) => void;
  setSort: (filter: FiltersNames, direction: boolean) => void;
}

type FilterAppProps = StateProps & DispatchProps;

class FilterApp extends React.Component<FilterAppProps> {
  componentWillMount () {
    this.fillStaticFiltersDefinitionsOptions();
  }

  // This is hacky, but it's now the convention
  fillStaticFiltersDefinitionsOptions () {
    let TagsFilter = definitions.filters.get('Tags');

    TagsFilter.cell['tags'] = this.props.tags;
    TagsFilter.control['tags'] = this.props.tags;
  }

  handleRequestMoreGames = () => {
    let page = this.props.games.length;
    this.props.getGames(page);
  }

  onRemoveFilter = (filter: FiltersNames) => {
    this.props.setQuery(filter, null);
  }

  render () {
    let p = this.props;
    return (
      <div className={th.FilterApp}>
        {/* <AppBar className={th.FilterApp__AppBar}>
          <SfilterBar/>
          <QueryChipsList
            controlsHlMode={p.newFilter.controlsHlMode}
            controlsParams={p.newFilter.controlsParams}
            onRemove={this.onRemoveFilter}/>
        </AppBar> */}
        {/* <FiltersPanel/>  */}
        {/*<FrontPageFilters/>*/}
        {/* <CategoriesList/> */}
        <Configurator
          onQueryChange={p.setQuery}
          onColumnChange={p.setColumn}
          onHlChange={p.setHl}
          configuration={p.configuration}/>
        <Table
          gamesPages={p.games}
          configuration={p.configuration}
          setSort={p.setSort}
          setQuery={p.setQuery}/>

          {/* columns={p.definedColumnsList}
          columnsParams={p.newFilter.controlsParams}
          columnsWidth={p.columnsWidth}
          sorting={p.newFilter.sorting}
          tableWidth={p.tableWidth}/> */}
        {/* <GamesLoader
          fetching={p.gamesLoading}
          failed={p.gamesFailed}
          onRequestMore={this.handleRequestMoreGames}
          loadedGames={p.gamesLoadedCount}
          totalGames={p.gamesTotalCount}/> */}
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, {}>((s) => ({
  configuration: filterSel.configuration(s),
  games: filterSel.gamesBatches(s),
  tags: s.tags,
  gamesLoadedCount: filterSel.gamesLoadedCount(s),
  gamesTotalCount: filterSel.gamesTotalCount(s),
  gamesLoading: filterSel.gamesLoading(s),
  gamesFailed: filterSel.gamesFailed(s)
}), {
  getGames: a.getGames,
  setQuery: a.setQuery,
  setColumn: a.setColumn,
  setHl: a.setHl,
  setSort: a.setSort
})(FilterApp);
