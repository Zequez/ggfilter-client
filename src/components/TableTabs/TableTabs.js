import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { FILTER_MODES } from 'stores/reducers/uiReducer'
import TableTabsLink from './TableTabsLink'

@connect((s) => ({
  currentUser: s.auth.currentUser
}))
export default class TableTabs extends Component {
  static propTypes = {
    currentUser: t.object
  }

  render () {
    console.logRender('TableTabs')
    let { currentUser } = this.props

    return (
      <nav className='nav'>
        <ul className='nav-tabs'>
          <TableTabsLink text='Columns' mode={FILTER_MODES.columns}/>
          <TableTabsLink text='Save/Share' mode={FILTER_MODES.share}/>
          {currentUser ? <TableTabsLink text='Your saved filters' mode={FILTER_MODES.saved}/> : null}
          {false ? <TableTabsLink text='Options' mode={FILTER_MODES.options}/> : null}
          {/*<NavTabLink text='System Req.' mode={MODES.sysreq} currentMode={mode} setMode={setMode}/>*/}
          {/*<NavTabLink icon='link' mode={MODES.filter} currentMode={mode} setMode={setMode}/>*/}
        </ul>
      </nav>
    )
  }
}
