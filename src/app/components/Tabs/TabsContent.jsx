import React, { PropTypes as t, Component } from 'react'

import { MODES } from 'shared/reducers/uiReducer'

import { FilterApp } from 'src/FilterApp'
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
    mode: t.string.isRequired,
    filterLockedInView: t.bool.isRequired
  }

  tabsContent () {
    switch (this.props.mode) {
      case MODES.sysreq: return <SysreqCalc/>
      // case MODES.officialFilters: return <OfficialFilters/>
      case MODES.feedback: return <Feedback/>
      case MODES.contribute: return <Contribute/>
      // case MODES.login: return 'Login'
      case MODES.sources: return <Sources/>
      // case MODES.myFilters: return <SavedFiltersManagerGlued/>
      case MODES.aboutSysreq: return <AboutSysreq/>
    }

    return null
  }

  render () {
    let { mode, filterLockedInView } = this.props

    return (
      <div className='tabs-content'>
        <div className='tabs-content-normal'>
          {this.tabsContent()}
        </div>
        {mode === MODES.filter || filterLockedInView ? (
          <FilterApp/>
        ) : null}
      </div>
    )
  }
}
