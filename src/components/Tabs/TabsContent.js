import React, { PropTypes as t, Component } from 'react'

import { MODES } from 'stores/reducers/uiReducer'

import FilterApp from 'components/FilterApp/FilterApp'

export default class TabsContent extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  tabsContent () {
    switch (this.props.mode) {
      case MODES.filter: return <FilterApp/>
    }

    return null
  }

  render () {
    return (
      <div className='tabs-content'>
        {this.tabsContent()}
      </div>
    )
  }
}
