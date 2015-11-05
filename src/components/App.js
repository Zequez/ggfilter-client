require('styles/App');
require('es6-promise').polyfill()
require('isomorphic-fetch')
window.React = require('react')
window._ = require('lodash')

var bindActionCreators = require('redux').bindActionCreators
var connect = require('react-redux').connect

var NavTabs = require('./NavTabs')
var FiltersToggles = require('./tabs/FiltersToggles')
var DataTable = require('./DataTable')

import { Tabs, getGames } from 'stores/actions'

class App extends React.Component {
  constructor(props) {
    super(props)

    if (!props.games.batches.length) {
      props.getGames()
    }
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
    console.log('Render <App/>')

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
            filters={this.props.toggledFilters}/>
        </main>
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

export default connect(
  (state)=>{ return state },
  (dispatch)=> bindActionCreators({ getGames }, dispatch)
)(App)
