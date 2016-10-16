import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { MODES } from 'shared/reducers/uiReducer'
import RouterLink from 'shared/components/RouterLink'
import FilterTabLink from './FilterTabLink'
import FilterViewLocker from './FilterViewLocker'

@connect((s) => ({
  currentUser: s.auth.currentUser
}))
export default class Tabs extends Component {
  static propTypes = {
    onLockFilter: t.func.isRequired,
    onUnlockFilter: t.func.isRequired
  }

  render () {
    let { currentUser } = this.props

    return (
      <nav className='tabs'>
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
          <FilterViewLocker/>
        </ul>
      </nav>
    )
  }
}
