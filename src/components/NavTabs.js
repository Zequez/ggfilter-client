var React = require('react')
var connect = require('react-redux').connect
var classNames = require('classnames')

class NavTabs extends React.Component {
  render() {
    var select = (tab)=> ()=> this.props.select(tab)
    var klass = (tab)=> (tab == this.props.tab) ? 'active' : null

    return (
      <ul className='nav-tabs'>
        <li onClick={select('filters')} className={klass('filters')}>Filters</li>
        <li onClick={select('sources')} className={klass('sources')}>Sources</li>
        <li onClick={select('feedback')} className={klass('feedback')}>Feedback</li>
        <li onClick={select('donations')} className={klass('donations')}>Donations</li>
      </ul>
    )
  }
}

export default connect(null, (dispatch)=>{
  return {
    select: (tab) => dispatch({type: 'SELECT_TAB', tab: tab})
  }
})(NavTabs)

// export default NavTabs
