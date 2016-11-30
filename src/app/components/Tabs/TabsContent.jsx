import th from './theme'
import React, { PropTypes as t, Component } from 'react'

import { MODES } from 'shared/reducers/uiReducer'

import { FilterAppPage } from 'src/FilterApp'
import { SysreqCalc } from 'src/SysreqCalc'
// import OfficialFilters from '../OfficialFilters'
// import { SavedFiltersManagerGlued } from 'src/SavedFiltersManager'

// Tabs with static content
import Sources from '../static/Sources'
import Feedback from '../static/Feedback'
import Contribute from '../static/Contribute'
import AboutSysreq from '../static/AboutSysreq'

export default class TabsContent extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  tabsContent () {
    let { mode, ...other } = this.props

    switch (mode) {
      case MODES.sysreq: return <SysreqCalc {...other}/>
      // case MODES.officialFilters: return <OfficialFilters/>
      case MODES.feedback: return <Feedback {...other}/>
      case MODES.contribute: return <Contribute {...other}/>
      // case MODES.login: return 'Login'
      case MODES.sources: return <Sources {...other}/>
      // case MODES.myFilters: return <SavedFiltersManagerGlued/>
      case MODES.aboutSysreq: return <AboutSysreq {...other}/>
      case MODES.filter: return <FilterAppPage {...other}/>
    }

    return null
  }

  render () {
    return (
      <div className={th.content}>
        {this.tabsContent()}
      </div>
    )
  }
}
