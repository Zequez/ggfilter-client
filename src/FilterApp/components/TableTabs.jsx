import React, { Component } from 'react'

import { TABS } from '../ui/reducer'
import TableTabsLink from './TableTabsLink'

export default class TableTabs extends Component {
  render () {
    console.logRender('TableTabs')

    return (
      <nav className='table-tabs'>
        <ul>
          <TableTabsLink text='Columns' mode={TABS.columns}/>
          <TableTabsLink text='Save/Share' mode={TABS.share}/>
          {/*<TableTabsLink text='Options' mode={TABS.options}/>*/}
          {/*<NavTabLink text='System Req.' mode={MODES.sysreq} currentMode={mode} setMode={setMode}/>*/}
          {/*<NavTabLink icon='link' mode={MODES.filter} currentMode={mode} setMode={setMode}/>*/}
        </ul>
      </nav>
    )
  }
}
