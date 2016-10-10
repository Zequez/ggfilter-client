import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { FILTER_MODES } from 'stores/reducers/uiReducer'

import FiltersToggles from './FiltersToggles'
import SFilterTab from './SFilterTab'

@connect((s) => ({mode: s.ui.filterMode}))
export default class FilterTabsContent extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  modeComponent () {
    switch (this.props.mode) {
      case FILTER_MODES.columns: return <FiltersToggles/>
      case FILTER_MODES.share: return <SFilterTab/>
      case FILTER_MODES.saved: return 'Saved filters!'
      case FILTER_MODES.options: return 'Options!'
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
