import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import filtersDefinitions from 'sources/filtersDefinitions'

import { showLightbox } from 'stores/reducers/lightboxReducer'
import { getGames, getMoreGames } from 'stores/reducers/gamesReducer'

import { MODES } from 'stores/reducers/modeReducer'

import Layout from 'components/Layout'
import DataTable from 'components/DataTable'
import GamesLoader from 'components/GamesLoader'
import Lightbox from 'components/Lightbox'
// Modes
import FiltersToggles from 'components/tabs/FiltersToggles'
import SourcesTab from 'components/tabs/SourcesTab'
import SysreqCalc from 'components/tabs/SysreqCalc'
import ShareTab from 'components/tabs/ShareTab'

@connect(
  (s) => ({
    filter: s.filter,
    games: s.games,
    lightbox: s.lightbox,
    tags: s.tags,
    columnsWidth: s.columnsWidth,
    options: s.options,
    routing: s.routing,
    mode: s.mode
  }),
  { getGames, getMoreGames, showLightbox }
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

  modeComponent (mode) {
    switch (mode) {
      case MODES.share: return <ShareTab/>
      case MODES.columns: return <FiltersToggles/>
      case MODES.sources: return <SourcesTab/>
      case MODES.sysreq: return <SysreqCalc/>
    }
    return null
  }

  render () {
    console.logRender('App')

    let { games, filter, columnsWidth, lightbox, mode } = this.props
    let containerClassName = `mode-${mode}`

    return (
      <Layout className={containerClassName}>
        <div className='tabs-content'>
          <div className='tabs-content-container'>
            {this.modeComponent(mode)}
          </div>
        </div>
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
