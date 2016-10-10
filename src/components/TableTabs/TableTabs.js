import React, { Component } from 'react'

import { FILTER_MODES } from 'stores/reducers/uiReducer'
import TableTabsLink from './TableTabsLink'

export default class TableTabs extends Component {
  render () {
    console.logRender('TableTabs')

    return (
      <nav className='nav'>
        <ul className='nav-tabs'>
          <TableTabsLink text='Columns' mode={FILTER_MODES.columns}/>
          <TableTabsLink text='Save/Share' mode={FILTER_MODES.share}/>
          <TableTabsLink text='Your saved filters' mode={FILTER_MODES.saved}/>
          <TableTabsLink text='Options' mode={FILTER_MODES.options}/>
          {/*<NavTabLink text='System Req.' mode={MODES.sysreq} currentMode={mode} setMode={setMode}/>*/}
          {/*<NavTabLink icon='link' mode={MODES.filter} currentMode={mode} setMode={setMode}/>*/}
        </ul>
      </nav>
    )
  }
}
