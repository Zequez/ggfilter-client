import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// <EXTERNAL>
import { loadFilter, selectCurrentFilter } from 'stores/reducers/sFilterReducer'
import { selectCurrentUser } from 'stores/reducers/authReducer'
import { setFilterMode, FILTER_MODES } from 'stores/reducers/uiReducer'
// </EXTERNAL>

import SavedFiltersManager from './SavedFiltersManager'

export class SavedFiltersManagerGlued extends Component {
  static propTypes = {
    currentUser: t.object,
    currentFilter: t.object,
    loadFilter: t.func,
    setFilterMode: t.func
  }

  onLoad = (sfilter) => {
    this.props.loadFilter(sfilter)
  }

  onEdit = (sfilter) => {
    this.props.loadFilter(sfilter)
    this.props.setFilterMode(FILTER_MODES.share)
  }

  render () {
    let { currentUser, currentFilter, loadFilter } = this.props
    return (
      <SavedFiltersManager
        currentUser={currentUser}
        currentFilter={currentFilter}
        loadFilter={loadFilter}
        onLoad={this.onLoad}
        onEdit={this.onEdit}/>
    )
  }
}

export default connect((s) => createStructuredSelector({
  currentFilter: selectCurrentFilter,
  currentUser: selectCurrentUser
}), { loadFilter, setFilterMode })(SavedFiltersManagerGlued)
