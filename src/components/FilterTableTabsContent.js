import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { FILTER_MODES } from 'stores/reducers/uiReducer'

import FiltersToggles from 'components/tabs/FiltersToggles'
import ShareTab from 'components/tabs/ShareTab'

@connect((s) => ({mode: s.ui.filterMode}))
export default class FilterTableTabsContent extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  modeComponent () {
    switch (this.props.mode) {
      case FILTER_MODES.columns: return <FiltersToggles/>
      case FILTER_MODES.share: return <ShareTab/>
      case FILTER_MODES.saved: return 'Saved filters!'
      case FILTER_MODES.options: return 'Options!'
    }
    return null
  }

  render () {
    return (
      <div className='tabs-content'>
        <div className='tabs-content-container'>
          {this.modeComponent()}
        </div>
      </div>
    )
  }
}
