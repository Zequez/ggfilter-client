import React, { Component } from 'react'

import { TABS } from '../ui/reducer'

import filtersShortcuts from '../config/filtersShortcuts'

import TableTabsLink from './TableTabsLink'
import FilterShortcut from './FilterShortcut'

export default class TableTabs extends Component {
  render () {
    console.logRender('TableTabs')

    return (
      <nav className='table-tabs'>
        <ul>
          <TableTabsLink text='Columns' mode={TABS.columns}/>
          <TableTabsLink text='Save/Share' mode={TABS.share}/>
          {/*<TableTabsLink text='Options' mode={TABS.options}/>*/}
          <FilterShortcut shortcut={filtersShortcuts.decrapify}>
            Decrapify
          </FilterShortcut>
          <FilterShortcut shortcut={filtersShortcuts.playtimeForTheBuck}>
            Playtime for your buck
          </FilterShortcut>
        </ul>
      </nav>
    )
  }
}
