import th from './FilterApp.sass'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'

import definitions from '../../Definitions'

import { setControlParams, getGames } from '../filter/actions'
import * as filterSel from '../filter/selectors'

import Table from './Table/Table'
import GamesLoader from './GamesLoader'
import CategoriesList from './CategoriesList'
import QueryChipsList from './QueryChipsList'
import SfilterBar from './SfilterBar'
import FrontPageFilters from './FrontPageFilters'
import FiltersPanel from './FiltersPanel'
import Configurator from './Configurator'

import { AppBar } from 'src/Layout'

@connect((s) => ({
  definedControlsList: filterSel.definedControlsList(s),
  definedColumnsList: filterSel.definedColumnsList(s),
  newFilter: filterSel.filter(s),

  games: filterSel.gamesBatches(s),
  tags: s.tags,
  gamesLoadedCount: filterSel.gamesLoadedCount(s),
  gamesTotalCount: filterSel.gamesTotalCount(s),
  gamesLoading: filterSel.gamesLoading(s),
  gamesFailed: filterSel.gamesFailed(s)
}), {
  getGames,
  setControlParams
})
export default class FilterApp extends Component {
  static propTypes = {
    games: t.arrayOf(t.array).isRequired,

    getGames: t.func,
    setColumnParams: t.func,
    gamesLoadedCount: t.number,
    gamesTotalCount: t.number,
    gamesLoading: t.bool,
    gamesFailed: t.bool
  }

  componentWillMount () {
    this.fillStaticFiltersDefinitionsOptions()
  }

  // This is hacky, but it's now the convention
  fillStaticFiltersDefinitionsOptions () {
    let TagsFilter = definitions.filters.get('Tags');

    TagsFilter.cell.tags =  this.props.tags;
    TagsFilter.control.tags = this.props.tags;

    // definitions.filters.tags.controlOptions.tags = this.props.tags
    // definitions.filters.tags.columnOptions.tags = this.props.tags
    // definitions.filters.tags.chipOptions.tags = this.props.tags
  }

  handleRequestMoreGames = () => {
    let page = this.props.games.length
    this.props.getGames(page)
  }

  onRemoveFilter = (name) => {
    this.props.setControlParams(name, null)
  }

  render () {
    let p = this.props
    return (
      <div className={th.FilterApp}>
        <AppBar className={th.FilterApp__AppBar}>
          <SfilterBar/>
          <QueryChipsList
            controlsHlMode={p.newFilter.controlsHlMode}
            controlsParams={p.newFilter.controlsParams}
            onRemove={this.onRemoveFilter}/>
        </AppBar>
        {/* <FiltersPanel/>  */}
        {/*<FrontPageFilters/>*/}
        {/* <CategoriesList/> */}
        <Configurator/>
        <Table
          gamesPages={p.games}
          columns={p.definedColumnsList}
          columnsParams={p.newFilter.controlsParams}
          columnsWidth={p.columnsWidth}
          sorting={p.newFilter.sorting}
          tableWidth={p.tableWidth}/>
        <GamesLoader
          fetching={p.gamesLoading}
          failed={p.gamesFailed}
          onRequestMore={this.handleRequestMoreGames}
          loadedGames={p.gamesLoadedCount}
          totalGames={p.gamesTotalCount}/>
      </div>
    )
  }
}
