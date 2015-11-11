require('styles/App');
require('es6-promise').polyfill()
require('isomorphic-fetch')

var bindActionCreators = require('redux').bindActionCreators
var connect = require('react-redux').connect

var NavTabs =        require('components/NavTabs')
var FiltersToggles = require('components/tabs/FiltersToggles')
var DataTable =      require('components/DataTable')
var GamesLoader =    require('components/GamesLoader')

import { Tabs, getGames, getMoreGames } from 'stores/actions'

class App extends React.Component {
  constructor(props) {
    super(props)

    if (!props.games.batches.length) {
      props.getGames()
    }
  }

  handleRequestMoreGames() {
    this.props.getMoreGames()
  }

  tabContent(tab) {
    switch(tab) {
      case Tabs.FILTERS: return <FiltersToggles toggledFilters={this.props.toggledFilters}/>
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
            filters={this.props.toggledFilters}/>
          <GamesLoader
            fetching={this.props.games.fetching}
            failed={this.props.games.failed}
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
