import { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { history } from 'stores/AppStore'
import * as urlificator from 'lib/urlificator'
import * as classNames from 'classnames'

@connect((state) => ({
  toggledFilters: state.toggledFilters,
  query: state.query,
}))
export default class NavTabs extends Component {
  gotoFilterIfActive (ev) {
    if (ev.currentTarget.className.match(/active/)) {
      ev.preventDefault()
      let encodedState = urlificator.encode(this.props)
      let url = `${location.origin}/filter/${encodedState}`
      history.push(url)
    }
  }

  render() {
    console.info('Render <NavTabs/>')

    return (
      <ul className='nav-tabs'>
        <li>
          <Link
            to='/share'
            onClick={::this.gotoFilterIfActive}
            activeClassName='active'>
            <i className='fa icon-share'></i>
          </Link>
        </li>
        <li>
          <Link
            to='/columns'
            onClick={::this.gotoFilterIfActive}
            activeClassName='active'>
            Columns
          </Link>
        </li>
        <li>
          <Link
            to='/system-requirements'
            onClick={::this.gotoFilterIfActive}
            activeClassName='active'>
            Sysreq Calculator
          </Link>
        </li>
        {/*<li className=''><a href='/popular-filters'>Popular Filters</a></li>*/}
        {/*<li className=''><a href='/email-alerts'>Email Alerts</a></li>*/}
        <li>
          <Link
            to='/sources'
            onClick={::this.gotoFilterIfActive}
            activeClassName='active'>
            Sources
          </Link>
        </li>
        {/*<li className=''><a href='/feedback'>Feedback</a></li>*/}
        {/*<li className=''><a href='/sponsor'>Sponsor</a></li>*/}
      </ul>
    )
  }
}
