import React, { PropTypes as t, Component } from 'react'
import { MODES } from 'stores/reducers/uiReducer'
import RouterLink from 'components/RouterLink'

export default class GeneralNav extends Component {
  render () {
    return (
      <nav className='general-nav'>
        <ul>
          <li>
            <RouterLink to={MODES.filter}>
              Filter <i className='fa icon-unlock' title='Lock filtering table into view'></i>
            </RouterLink>
          </li>
          <li>
            <RouterLink to={MODES.sysreq} text='System Requirements Calculator'/>
          </li>
          <li>
            <RouterLink to={MODES.officialFilters} text='Interesting Filters'/>
          </li>
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
