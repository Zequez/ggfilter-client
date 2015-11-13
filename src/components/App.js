require('styles/App');
require('es6-promise').polyfill()
require('isomorphic-fetch')

var bindActionCreators = require('redux').bindActionCreators
var connect = require('react-redux').connect

var filtersDefinitions = require('sources/filtersDefinitions')

var NavTabs =        require('components/NavTabs')
var FiltersToggles = require('components/tabs/FiltersToggles')
var DataTable =      require('components/DataTable')
var GamesLoader =    require('components/GamesLoader')

import { Tabs, getGames, getMoreGames } from 'stores/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    if (!props.games.batches.length) props.getGames()
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

  tabContent(tab) {
    switch(tab) {
      case Tabs.FILTERS:
        return <FiltersToggles filters={this.state.filters}/>
      case Tabs.SOURCES: return null
      case Tabs.FEEDBACK: return null
      case Tabs.DONATIONS: return null
    }
  }

  render() {
    console.info('Render <App/>')

    return (
      <div className='container'>
        <header className='header'>GGFilter</header>
        <main className='main'>
          <nav className='nav'>
            <NavTabs tab={this.props.tab}/>
          </nav>
          <div className='tabs-content'>
            {this.tabContent(this.props.tab)}
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
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

export default connect(
  (state)=>{ return state },
  (dispatch)=> bindActionCreators({ getGames, getMoreGames }, dispatch)
)(App)
