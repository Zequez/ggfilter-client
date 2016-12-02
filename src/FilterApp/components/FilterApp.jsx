import th from './theme'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import definitions from '../lib/definitions'

const { getGames, getMoreGames } = require('../games').actions
import { setDocWidth } from '../ui/reducer'
import { getTrueColumnsWidth, getTrueTableWidth, getTab } from '../ui/selectors'
import { finalFilterSelector, visibleFiltersDefinitionsSelector } from '../filter/selectors'

import Table from './Table/Table'
// import GamesLoader from './GamesLoader'
import FilterMasks from './FilterMasks'
import CategoriesList from './CategoriesList'

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
  setDocWidth
})
export default class FilterApp extends Component {
  static propTypes = {
    getGames: t.func,
    getMoreGames: t.func
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
  }

  handleRequestMoreGames () {
    this.props.getMoreGames()
  }

  render () {
    let {games, filter, columnsWidth, tableWidth, visibleFilters} = this.props

    return (
      <div className={th.filterApp}>
        <FilterMasks/>
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
