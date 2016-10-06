import React, { Component } from 'react'

import { FILTER_MODES } from 'stores/reducers/uiReducer'
import NavTabLink from './NavTabLink'

export default class NavTabs extends Component {
  render () {
    console.logRender('NavTabs')

    return (
      <ul className='nav-tabs'>
        <NavTabLink text='Columns' mode={FILTER_MODES.columns}/>
        <NavTabLink text='Save/Share' mode={FILTER_MODES.share}/>
        <NavTabLink text='Your saved filters' mode={FILTER_MODES.saved}/>
        <NavTabLink text='Options' mode={FILTER_MODES.options}/>
        {/*<NavTabLink text='System Req.' mode={MODES.sysreq} currentMode={mode} setMode={setMode}/>*/}
        {/*<NavTabLink icon='link' mode={MODES.filter} currentMode={mode} setMode={setMode}/>*/}
      </ul>
    )
  }
}
