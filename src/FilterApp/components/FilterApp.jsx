import th from './FilterApp.sass'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import definitions from '../lib/definitions'

const { getGames, getMoreGames } = require('../games').actions
import { setDocWidth } from '../ui/reducer'
import { setParam } from '../filter/reducer'
import { getTrueColumnsWidth, getTrueTableWidth, getTab } from '../ui/selectors'
import { finalFilterSelector, visibleFiltersDefinitionsSelector } from '../filter/selectors'

import Table from './Table/Table'
// import GamesLoader from './GamesLoader'
import Shortcuts from './Shortcuts'
import CategoriesList from './CategoriesList'
import QueryChipsList from './QueryChipsList'

import { AppBar } from 'src/Layout'

@connect((s) => ({
  filter: finalFilterSelector(s),
  visibleFilters: visibleFiltersDefinitionsSelector(s),
  games: s.games,
  tags: s.tags,
  // columnsWidth: getTrueColumnsWidth(s),
  // tableWidth: getTrueTableWidth(s),
  tab: getTab(s)
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
    setParam: t.func
  }

  componentWillMount () {
    this.fillStaticFiltersDefinitionsOptions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debouncedResize)
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
    let {games, filter, columnsWidth, tableWidth, visibleFilters} = this.props
    return (
      <div className={th.FilterApp}>
        <AppBar className={th.FilterApp__AppBar}>
          <h1>Filter</h1>
          <QueryChipsList
            filter={filter}
            visibleFilters={visibleFilters}
            onRemove={this.onRemoveFilter}/>
        </AppBar>
        {/*<Shortcuts/>*/}
        <CategoriesList/>
        <Table
          games={games}
          filter={filter}
          columnsWidth={columnsWidth}
          tableWidth={tableWidth}
          visibleFiltersDefinitions={visibleFilters}/>
        {/*<GamesLoader
          fetching={games.fetching}
          failed={games.failed}
          lastPage={games.lastPage}
          onRequestMore={::this.handleRequestMoreGames} />*/}
      </div>
    )
  }
}
