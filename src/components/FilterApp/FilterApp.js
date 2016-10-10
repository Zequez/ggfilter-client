import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'

import filtersDefinitions from 'sources/filtersDefinitions'

import { getGames, getMoreGames } from 'stores/reducers/gamesReducer'

import DataTable from 'components/DataTable/DataTable'
import TableTabs from 'components/TableTabs/TableTabs'
import TableTabsContent from 'components/TableTabs/TableTabsContent'
import GamesLoader from './GamesLoader'

@connect((s) => ({
  filter: s.filter,
  games: s.games,
  tags: s.tags,
  columnsWidth: s.columnsWidth
}), {
  getGames,
  getMoreGames
})
export default class FilterApp extends Component {
  static propTypes = {
    getGames: t.func,
    getMoreGames: t.func
  }

  componentWillMount () {
    this.fillStaticFiltersDefinitionsOptions()
    this.cacheFiltersDefinitions()
  }

  // This is hacky, but it's now the convention
  fillStaticFiltersDefinitionsOptions () {
    filtersDefinitions.tags.filterOptions.tags = this.props.tags
    filtersDefinitions.tags.columnOptions.tags = this.props.tags
  }

  componentWillReceiveProps (np) {
    let tp = this.props
    if (tp.filter.visible !== np.filter.visible) {
      this.cacheFiltersDefinitions(np)
    }
  }

  visibleFilters = []
  cacheFiltersDefinitions (p = this.props) {
    this.visibleFilters = p.filter.visible.map((f) => filtersDefinitions[f])
  }

  handleRequestMoreGames () {
    this.props.getMoreGames()
  }

  render () {
    let {games, filter, columnsWidth} = this.props

    return (
      <div className='filter-tab'>
        <TableTabs/>
        <TableTabsContent/>
        <DataTable
          games={games}
          filter={filter}
          columnsWidth={columnsWidth}
          visibleFiltersDefinitions={this.visibleFilters}/>
        <GamesLoader
          fetching={games.fetching}
          failed={games.failed}
          lastPage={games.lastPage}
          onRequestMore={::this.handleRequestMoreGames} />
      </div>
    )
  }
}
