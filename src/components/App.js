require('styles/App')

import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

var filtersDefinitions = require('sources/filtersDefinitions')

var Layout = require('components/Layout')

var DataTable = require('components/DataTable')
var GamesLoader = require('components/GamesLoader')
var Lightbox = require('components/Lightbox')

import { showLightbox } from 'stores/actions'
import { getGames, getMoreGames } from 'stores/reducers/gamesReducer'

@connect(
  (s) => ({
    filter: s.filter,
    games: s.games,
    lightbox: s.lightbox,
    tags: s.tags,
    columnsWidth: s.columnsWidth,
    options: s.options
  }),
  { getGames, getMoreGames, showLightbox }
)
export default class App extends Component {
  static propTypes = {
    // The store on initialState
  }

  componentWillMount () {
    if (!this.props.games.batches.length) this.props.getGames()
    this.fillStaticFiltersDefinitionsOptions()
    this.loadFilters()
  }

  // This is hacky, but it's now the convention
  fillStaticFiltersDefinitionsOptions () {
    filtersDefinitions.tags.filterOptions.tags = this.props.tags
    filtersDefinitions.tags.columnOptions.tags = this.props.tags
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.filter.visible !== nextProps.filter.visible) {
      this.loadFilters(nextProps.filter.visible)
    }
  }

  loadFilters (visibleFiltersNames = this.props.filter.visible) {
    this.setState({
      filters: visibleFiltersNames.map((f) => filtersDefinitions[f])
    })
  }

  handleRequestMoreGames () {
    this.props.getMoreGames()
  }

  onLightboxClose = () => {
    this.props.showLightbox([], [])
  }

  render () {
    console.info('Render <App/>')
    let { children, games, filter, columnsWidth, lightbox } = this.props
    let { filters } = this.state

    return (
      <Layout>
        <div className='tabs-content'>
          <div className='tabs-content-container'>
            {children}
          </div>
        </div>
        <DataTable
          games={games}
          filter={filter}
          columnsWidth={columnsWidth}
          visibleFiltersDefinitions={filters}/>
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
