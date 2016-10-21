import React, { Component } from 'react'

import { TABS } from '../ui/reducer'

import TableTabsLink from './TableTabsLink'
import FilterMasks from './FilterMasks'

export default class TableTabs extends Component {
  render () {
    console.logRender('TableTabs')

    return (
      <nav className='table-tabs'>
        <FilterMasks/>
        <ul className='table-tabs-buttons'>
          <TableTabsLink text='Columns' mode={TABS.columns}/>
          {/*<TableTabsLink text='Save/Share' mode={TABS.share}/>*/}
          {/*<TableTabsLink text='Options' mode={TABS.options}/>*/}
        </ul>
      </nav>
    )
  }
}
