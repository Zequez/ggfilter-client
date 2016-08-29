require('styles/App');

import React, { Component, PropTypes as t } from 'react'
import { connect} from 'react-redux'
var bindActionCreators = require('redux').bindActionCreators
import { Link } from 'react-router'

var filtersDefinitions = require('sources/filtersDefinitions')

var Layout = require('components/Layout')

var NavTabs = require('components/NavTabs')
var DataTable = require('components/DataTable')
var GamesLoader = require('components/GamesLoader')
var Lightbox = require('components/Lightbox')

var FiltersToggles = require('components/tabs/FiltersToggles')
var SourcesTab = require('components/tabs/SourcesTab')
var SysreqCalc = require('components/tabs/SysreqCalc')

import { Tabs, getGames, getMoreGames, showLightbox } from 'stores/actions'

class App extends Component {
  static propTypes = {
    // The store on initialState
  }

  componentWillMount() {
    if (!this.props.games.batches.length) this.props.getGames()
    this.fillStaticFiltersDefinitionsOptions()
    this.loadFilters()
  }

  // This is hacky, but it's now the convention
  fillStaticFiltersDefinitionsOptions() {
    filtersDefinitions.tags.filterOptions.tags = this.props.tags
    filtersDefinitions.tags.columnOptions.tags = this.props.tags
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.toggledFilters !== nextProps.toggledFilters) {
      this.loadFilters(nextProps.toggledFilters)
    }
  }

  loadFilters(filtersNames = this.props.toggledFilters) {
    this.setState({
      filters: filtersNames.map((f)=>filtersDefinitions[f])
    })
  }

  handleRequestMoreGames() {
    this.props.getMoreGames()
  }

  onLightboxClose = ()=>{
    this.props.showLightbox([], [])
  }

  render() {
    console.info('Render <App/>')

    return (
      <Layout>
        <div className='tabs-content'>
          <div className='tabs-content-container'>
            {this.props.children}
          </div>
        </div>
        <DataTable
          games={this.props.games}
          query={this.props.query}
          columnsWidth={this.props.columnsWidth}
          filters={this.state.filters}
          tags={this.props.tags}/>
        <GamesLoader
          fetching={this.props.games.fetching}
          failed={this.props.games.failed}
          lastPage={this.props.games.lastPage}
          onRequestMore={this.handleRequestMoreGames.bind(this)} />
        <Lightbox
          media={this.props.lightbox.media}
          thumbnails={this.props.lightbox.thumbnails}
          onClose={this.onLightboxClose}/>
      </Layout>
    )
  }
}

App.defaultProps = {}

export default connect(
  (state)=>{ return state },
  (dispatch)=> bindActionCreators({ getGames, getMoreGames, showLightbox }, dispatch)
)(App)
