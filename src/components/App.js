import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import filtersDefinitions from 'sources/filtersDefinitions'

import { showLightbox } from 'stores/reducers/lightboxReducer'
import { getGames, getMoreGames } from 'stores/reducers/gamesReducer'
import { resetFilters } from 'stores/reducers/filterReducer'
import { resetUi } from 'stores/reducers/uiReducer'

import Layout from 'components/Layout'
import DataTable from 'components/DataTable'
import GamesLoader from 'components/GamesLoader'
import Lightbox from 'components/Lightbox'
import FilterTableTabsContent from 'components/FilterTableTabsContent'
// Modes


@connect(
  (s) => ({
    filter: s.filter,
    games: s.games,
    lightbox: s.lightbox,
    tags: s.tags,
    columnsWidth: s.columnsWidth,
    options: s.options,
    routing: s.routing,
    mode: s.ui.mode,
    filterMode: s.ui.filterMode
  }),
  {
    getGames,
    getMoreGames,
    showLightbox,
    resetFilters,
    resetUi
  }
)
export default class App extends Component {
  static propTypes = {
    // The store on initialState
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

  onLightboxClose = () => {
    this.props.showLightbox([], [])
  }

  clickOnLogo = () => {
    this.props.resetFilters()
    this.props.resetUi()
  }

  render () {
    console.logRender('App')

    let { games, filter, columnsWidth, lightbox, mode, filterMode } = this.props
    let containerClassName = `mode-${mode} filter-mode-${filterMode}`

    return (
      <Layout className={containerClassName} clickOnLogo={this.clickOnLogo}>
        <FilterTableTabsContent/>
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
        <Lightbox
          media={lightbox.media}
          thumbnails={lightbox.thumbnails}
          onClose={this.onLightboxClose}/>
      </Layout>
    )
  }
}
