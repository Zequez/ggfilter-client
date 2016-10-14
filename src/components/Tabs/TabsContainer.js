import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'

import { lockFilterIntoView, unlockFilterFromView } from 'shared/reducers/uiReducer'

import Tabs from 'components/Tabs/Tabs'
import TabsContent from 'components/Tabs/TabsContent'

@connect((s) => ({
  filterLockedInView: s.ui.filterLockedInView,
  mode: s.ui.mode
}), {
  lockFilterIntoView,
  unlockFilterFromView
})
export default class TabsContainer extends Component {
  static propTypes = {
    lockFilterIntoView: t.func.isRequired,
    unlockFilterFromView: t.func.isRequired,
    filterLockedInView: t.bool.isRequired,
    mode: t.string.isRequired
  }

  render () {
    let { mode, filterLockedInView, lockFilterIntoView, unlockFilterFromView } = this.props

    return (
      <div className='tabs-container'>
        <Tabs
          filterLockedInView={filterLockedInView}
          onLockFilter={lockFilterIntoView}
          onUnlockFilter={unlockFilterFromView}/>
        <TabsContent mode={mode} filterLockedInView={filterLockedInView}/>
      </div>
    )
  }
}
