require('styles/App');

var React = require('react')
var connect = require('react-redux').connect

var NavTabs = require('./NavTabs')
var FiltersToggles = require('./tabs/FiltersToggles')

import { Tabs } from 'stores/actions'

class App extends React.Component {
  tabContent(tab) {
    switch(tab) {
      case Tabs.FILTERS: return <FiltersToggles toggledFilters={this.props.toggledFilters}/>
      case Tabs.SOURCES: return null
      case Tabs.FEEDBACK: return null
      case Tabs.DONATIONS: return null
    }
  }

  render() {
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
        </main>
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

function mapStateToProps(state) {
  return {
    tab: state.tab,
    toggledFilters: state.toggledFilters
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
