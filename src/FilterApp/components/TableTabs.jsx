import React, { Component, PropTypes as t } from 'react'

import { FILTER_MODES } from 'stores/reducers/uiReducer'
import TableTabsLink from './TableTabsLink'

export default class TableTabs extends Component {
  static propTypes = {

  }

  render () {
    console.logRender('TableTabs')

    return (
      <nav className='table-tabs'>
        <ul>
          <TableTabsLink text='Columns' mode={FILTER_MODES.columns}/>
          <TableTabsLink text='Save/Share' mode={FILTER_MODES.share}/>
          {false ? <TableTabsLink text='Options' mode={FILTER_MODES.options}/> : null}
          {/*<NavTabLink text='System Req.' mode={MODES.sysreq} currentMode={mode} setMode={setMode}/>*/}
          {/*<NavTabLink icon='link' mode={MODES.filter} currentMode={mode} setMode={setMode}/>*/}
        </ul>
      </nav>
    )
  }
}
