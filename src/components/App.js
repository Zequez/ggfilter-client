require('styles/App');
require('es6-promise').polyfill()
require('isomorphic-fetch')

var bindActionCreators = require('redux').bindActionCreators
var connect = require('react-redux').connect

var filtersDefinitions = require('sources/filtersDefinitions')

var NavTabs =        require('components/NavTabs')
var DataTable =      require('components/DataTable')
var GamesLoader =    require('components/GamesLoader')
var Lightbox =       require('components/Lightbox')

var FiltersToggles = require('components/tabs/FiltersToggles')
var SourcesTab     = require('components/tabs/SourcesTab')

import { Tabs, getGames, getMoreGames, showLightbox, getTags } from 'stores/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    if (!props.games.batches.length) props.getGames()
    if (!props.tags.length) props.getTags()
  }

  componentWillMount() {
    this.loadFilters()
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

  tabContent(tab, element) {
    let activeClass = tab == this.props.tab ? 'active' : ''
    return (
      <div className={'tab-content ' + activeClass}>
        {element}
      </div>
    )
  }

  onLightboxClose = ()=>{
    this.props.showLightbox([], [])
  }

  render() {
    console.info('Render <App/>')

    return (
      <div className='container'>
        <header className='header'>
          <div className='logo' title="The Great/Giant/Games/Gaming/Gems Filter. I haven't decided on a name yet.">
            GGFilter
          </div>
        </header>
        <main className='main'>
          <nav className='nav'>
            <NavTabs tab={this.props.tab}/>
          </nav>
          <div className='tabs-content'>
            {this.tabContent(Tabs.FILTERS, <FiltersToggles filters={this.state.filters}/>)}
            {this.tabContent(Tabs.SOURCES, <SourcesTab />)}
          </div>
          <DataTable
            games={this.props.games}
            query={this.props.query}
            columnsWidth={this.props.columnsWidth}
            filters={this.state.filters}/>
          <GamesLoader
            fetching={this.props.games.fetching}
            failed={this.props.games.failed}
            lastPage={this.props.games.lastPage}
            onRequestMore={this.handleRequestMoreGames.bind(this)} />
        </main>
        <Lightbox
          media={this.props.lightbox.media}
          thumbnails={this.props.lightbox.thumbnails}
          onClose={this.onLightboxClose}/>
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

export default connect(
  (state)=>{ return state },
  (dispatch)=> bindActionCreators({ getGames, getMoreGames, showLightbox, getTags }, dispatch)
)(App)
