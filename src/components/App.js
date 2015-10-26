require('styles/App');

var React = require('react')
var connect = require('react-redux').connect

var NavTabs = require('./NavTabs')
var FiltersToggles = require('./tabs/FiltersToggles')

class App extends React.Component {
  render() {
    var tabContent = {
      'filters': ()=> <FiltersToggles toggledFilters={this.props.toggledFilters}/>,
      'sources': ()=> null,
      'feedback': ()=> null,
      'donations': ()=> null,
    }[this.props.tab]()

    return (
      <div className='container'>
        <header className='header'>GGFilter</header>
        <main className='main'>
          <nav className='nav'>
            <NavTabs tab={this.props.tab}/>
          </nav>
          <div className='tabs-content'>
            {tabContent}
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
