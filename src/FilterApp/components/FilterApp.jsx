import th from './FilterApp.sass'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'

import definitions from '../lib/definitions'

const { getGames, getMoreGames } = require('../games').actions
import { setDocWidth } from '../ui/reducer'
import { setParam } from '../filter/reducer'
import { getTab } from '../ui/selectors'
import * as filterSel from '../filter/selectors'
import * as gameSel from '../games/selectors'

import Table from './Table/Table'
import GamesLoader from './GamesLoader'
import CategoriesList from './CategoriesList'
import QueryChipsList from './QueryChipsList'

import { AppBar } from 'src/Layout'

@connect((s) => ({
  definedControlsList: filterSel.definedControlsList(s),
  definedColumnsList: filterSel.definedColumnsList(s),
  newFilter: filterSel.filter(s),

  filter: filterSel.finalFilterSelector(s),
  visibleFilters: filterSel.visibleFiltersDefinitionsSelector(s),
  games: gameSel.games(s),
  tags: s.tags,
  tab: getTab(s),
  gamesLoadedCount: gameSel.loadedCount(s),
  gamesTotalCount: gameSel.totalCount(s),
  gamesFetching: gameSel.isFetching(s),
  gamesFailed: gameSel.failed(s)
}), {
  getGames,
  getMoreGames,
  setDocWidth,
  setParam
})
export default class FilterApp extends Component {
  static propTypes = {
    getGames: t.func,
    getMoreGames: t.func,
    setParam: t.func,
    gamesLoadedCount: t.number,
    gamesTotalCount: t.number,
    gamesFetching: t.bool,
    gamesFailed: t.bool
  }

  componentWillMount () {
    this.fillStaticFiltersDefinitionsOptions()
  }

  // This is hacky, but it's now the convention
  fillStaticFiltersDefinitionsOptions () {
    definitions.filters.tags.controlOptions.tags = this.props.tags
    definitions.filters.tags.columnOptions.tags = this.props.tags
    definitions.filters.tags.chipOptions.tags = this.props.tags
  }

  handleRequestMoreGames () {
    this.props.getMoreGames()
  }

  onRemoveFilter = (name) => {
    this.props.setParam(name, true)
  }

  render () {
    let p = this.props
    return (
      <div className={th.FilterApp}>
        <AppBar className={th.FilterApp__AppBar}>
          <h1>{p.gamesTotalCount == null ? '???' : p.gamesTotalCount} games found</h1>
          <QueryChipsList
            controlsParams={p.newFilter.controlsParams}
            onRemove={this.onRemoveFilter}/>
        </AppBar>
        <CategoriesList/>
        <Table
          gamesPages={p.games}
          columns={p.definedColumnsList}
          columnsParams={p.newFilter.columnsParams}
          columnsWidth={p.columnsWidth}
          sorting={p.newFilter.sorting}
          tableWidth={p.tableWidth}/>
        <GamesLoader
          fetching={p.gamesFetching}
          failed={p.gamesFailed}
          onRequestMore={::this.handleRequestMoreGames}
          loadedGames={p.gamesLoadedCount}
          totalGames={p.gamesTotalCount}/>
      </div>
    )
  }
}
