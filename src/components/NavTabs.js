import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { navigateToFilterUrl } from 'stores/reducers/filterUrlReducer'
const NavTabButton = require('./NavTabButton')

@connect((s) => ({
  toggledFilters: s.toggledFilters,
  query: s.query,
  routes: s.routing.routes
}), {
  navigateToFilterUrl
})
export default class NavTabs extends Component {
  static propTypes = {
    navigateToFilterUrl: t.func
  }

  inFilterRoute () {
    let r = this.props.routes
    return !!(~r.indexOf('b64Filter') || ~r.indexOf('idFilter'))
  }

  render () {
    let { navigateToFilterUrl } = this.props
    console.info('Render <NavTabs/>')

    return (
      <ul className='nav-tabs'>
        <NavTabButton href='/share' icon='share' onDeactivate={navigateToFilterUrl}/>
        <NavTabButton href='/' text='Columns' onDeactivate={navigateToFilterUrl}/>
        <NavTabButton href='/system-requirements' text='Sysreq Calculator' onDeactivate={navigateToFilterUrl}/>
        <NavTabButton href='/sources' text='Sources' onDeactivate={navigateToFilterUrl}/>
        <NavTabButton icon='link' onActivate={navigateToFilterUrl} active={this.inFilterRoute()}/>

        {/* /popular-filters  Popular Filters */}
        {/* /email-alerts     Email Alerts */}
        {/* /feedback         Feedback */}
        {/* /sponsor          Sponsor */}
      </ul>
    )
  }
}
