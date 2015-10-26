var React = require('react')
var connect = require('react-redux').connect
var classNames = require('classnames')

import { Tabs, selectTab } from 'stores/actions'

class NavTabs extends React.Component {
  render() {
    var klass = (tab)=> (tab == this.props.tab) ? 'active' : null

    return (
      <ul className='nav-tabs'>
        <li onClick={this.props.selectTab(Tabs.FILTERS)} className={klass('filters')}>Filters</li>
        <li onClick={this.props.selectTab(Tabs.SOURCES)} className={klass('sources')}>Sources</li>
        <li onClick={this.props.selectTab(Tabs.FEEDBACK)} className={klass('feedback')}>Feedback</li>
        <li onClick={this.props.selectTab(Tabs.DONATIONS)} className={klass('donations')}>Donations</li>
      </ul>
    )
  }
}

export default connect(null, (dispatch)=>{
  return { selectTab: ((tab)=> ()=> dispatch(selectTab(tab))) }
})(NavTabs)
