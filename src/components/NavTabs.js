import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { setMode, MODES } from 'stores/reducers/modeReducer'
import NavTabLink from './NavTabLink'

@connect((s) => ({
  toggledFilters: s.toggledFilters,
  query: s.query,
  mode: s.mode
}), {
  setMode
})
export default class NavTabs extends Component {
  static propTypes = {
    setMode: t.func
  }

  render () {
    console.logRender('NavTabs')

    let { mode, setMode } = this.props

    return (
      <ul className='nav-tabs'>
        <NavTabLink icon='share' mode={MODES.share} currentMode={mode} setMode={setMode}/>
        <NavTabLink text='Columns' mode={MODES.columns} currentMode={mode} setMode={setMode}/>
        <NavTabLink text='System Req.' mode={MODES.sysreq} currentMode={mode} setMode={setMode}/>
        <NavTabLink text='Sources' mode={MODES.sources} currentMode={mode} setMode={setMode}/>
        <NavTabLink icon='link' mode={MODES.filter} currentMode={mode} setMode={setMode}/>
      </ul>
    )
  }
}
