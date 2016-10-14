import React, { PropTypes as t, Component } from 'react'

import { MODES } from 'stores/reducers/uiReducer'

import { FilterApp } from 'src/FilterApp'
import { SysreqCalc } from 'src/SysreqCalc'
import SourcesTab from './SourcesTab'
import { SavedFiltersManagerGlued } from 'src/SavedFiltersManager'

export default class TabsContent extends Component {
  static propTypes = {
    mode: t.string.isRequired,
    filterLockedInView: t.bool.isRequired
  }

  tabsContent () {
    switch (this.props.mode) {
      case MODES.sysreq: return <SysreqCalc/>
      case MODES.officialFilters: return 'Official filters'
      case MODES.feedback: return 'Feedback'
      case MODES.contribute: return 'Contribute'
      case MODES.login: return 'Login'
      case MODES.sources: return <SourcesTab/>
      case MODES.myFilters: return <SavedFiltersManagerGlued/>
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
