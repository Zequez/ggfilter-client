import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { MODES } from 'stores/reducers/uiReducer'
import RouterLink from 'components/utils/RouterLink'
import FilterTabLink from './FilterTabLink'

@connect((s) => ({
  currentUser: s.auth.currentUser
}))
export default class Tabs extends Component {
  static propTypes = {
    onLockFilter: t.func.isRequired,
    onUnlockFilter: t.func.isRequired
    // filterLockedInView: t.bool.isRequired
  }

  // handleLockClick (ev) {
  //   ev.stopPropagation()
  //   ev.preventDefault()
  //   if (this.props.filterLockedInView) {
  //     this.props.onUnlockFilter()
  //   } else {
  //     this.props.onLockFilter()
  //   }
  // }

  render () {
    // let filterLockClass = this.props.filterLockedInView ? 'locked' : 'unlocked'

    /*<i
      className={`fa filter-lock icon-${filterLockClass}`}
      onClick={::this.handleLockClick}
      title='Lock filtering table into view'></i>*/

    let { currentUser } = this.props

    return (
      <nav className='general-nav'>
        <ul>
          <li>
            <FilterTabLink/>
          </li>
          <li>
            <RouterLink to={MODES.sysreq} text='System Requirements Calculator'/>
          </li>
          <li>
            <RouterLink to={MODES.officialFilters} text='Interesting Filters'/>
          </li>
          {currentUser ? <li>
            <RouterLink to={MODES.myFilters} text='Your saved filters'/>
          </li> : null}
          <li>
            <RouterLink to={MODES.feedback} text='Feedback'/>
          </li>
          <li>
            <RouterLink to={MODES.contribute} text='Contribute'/>
          </li>
          {/*<li>
            <RouterLink to='login' text='Log In'/>
          </li>*/}
        </ul>
      </nav>
    )
  }
}
