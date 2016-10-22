import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'

import { getTab } from '../ui/selectors'
import { TABS } from '../ui/reducer'
import { FiltersToggles } from '../filter'
// import { SFilterEditor } from '../sfilter'

@connect((s) => ({mode: getTab(s)}))
export default class FilterTabsContent extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  modeComponent () {
    switch (this.props.mode) {
      case TABS.columns: return <FiltersToggles/>
      // case TABS.share: return <SFilterEditor/>
      case TABS.options: return 'Options!'
    }
    return null
  }

  render () {
    return (
      <div className='table-tabs-content'>
        <div className='table-tabs-content-container'>
          {this.modeComponent()}
        </div>
      </div>
    )
  }
}
