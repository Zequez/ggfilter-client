import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// <EXTERNAL>
import { loadFilter, selectCurrentFilter, editMode } from 'src/FilterApp'
import { selectCurrentUser } from 'shared/reducers/authReducer'
import { setMode, MODES } from 'shared/reducers/uiReducer'
// </EXTERNAL>

import SavedFiltersManager from './SavedFiltersManager'

export class SavedFiltersManagerGlued extends Component {
  static propTypes = {
    currentUser: t.object,
    currentFilter: t.object,
    loadFilter: t.func,
    setFilterEditMode: t.func
  }

  onLoad = (sfilter) => {
    this.props.loadFilter(sfilter)
  }

  onEdit = (sfilter) => {
    this.props.loadFilter(sfilter)
    this.props.setFilterEditMode()
  }

  onGo = (sfilter) => {
    this.props.loadFilter(sfilter)
    this.props.setMode(MODES.filter)
  }

  render () {
    let { currentUser, currentFilter, loadFilter } = this.props
    return (
      <SavedFiltersManager
        currentUser={currentUser}
        currentFilter={currentFilter}
        loadFilter={loadFilter}
        onGo={this.onGo}
        onLoad={this.onLoad}
        onEdit={this.onEdit}/>
    )
  }
}

export default connect((s) => createStructuredSelector({
  currentFilter: selectCurrentFilter,
  currentUser: selectCurrentUser
}), { loadFilter, setFilterEditMode: editMode, setMode })(SavedFiltersManagerGlued)
