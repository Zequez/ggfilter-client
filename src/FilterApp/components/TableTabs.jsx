import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { TABS } from '../ui/reducer'
import { setParams } from '../filter/reducer'

import plusFilterParams from '../config/plusFilterParams'

import TableTabsLink from './TableTabsLink'

@connect(null, { setParams })
export default class TableTabs extends Component {
  static propTypes = {
    setParams: t.func.isRequired
  }

  onDecrapify = () => {
    this.props.setParams(plusFilterParams)
  }

  render () {
    console.logRender('TableTabs')

    return (
      <nav className='table-tabs'>
        <ul>
          <TableTabsLink text='Columns' mode={TABS.columns}/>
          <TableTabsLink text='Save/Share' mode={TABS.share}/>
          {/*<TableTabsLink text='Options' mode={TABS.options}/>*/}
          <li className='decrapify-tab'>
            <a className='btn' onClick={this.onDecrapify}>
              Decrapify
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
