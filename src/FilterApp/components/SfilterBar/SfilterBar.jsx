import th from './SfilterBar.sass'
import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { selectCurrentUser } from 'shared/reducers/authReducer'
import * as filterSel from '../../filter/selectors'
import * as filterAct from '../../filter/actions'
import SaveButtons from './SaveButtons'
import NameEditor from './NameEditor'
import { canUpdateFilter } from './utils'

type Props = {
  secrets: { [key: string]: string },
  filter: any,
  sfilterIsDirty: boolean,
  actualFilterIsDirty: boolean,
  currentUser: {
    isAdmin: boolean
  },
  setName: () => void,
  createSfilter: () => void,
  updateSfilter: () => void
}

@connect((s) => ({
  secrets: filterSel.secrets(s),
  filter: filterSel.filter(s),
  sfilterIsDirty: filterSel.sfilterIsDirty(s),
  actualFilterIsDirty: filterSel.actualFilterIsDirty(s),
  currentUser: selectCurrentUser(s)
}), {
  setName: filterAct.setName,
  createSfilter: filterAct.createSfilter,
  updateSfilter: filterAct.updateSfilter
})
export default class SfilterBar extends Component {
  props : Props

  onNameChange = (value) => {
    this.props.setName(value)
  }

  onUpdate = () => {
    let { secrets, filter } = this.props
    this.props.updateSfilter(filter, secrets[filter.sid])
  }

  onCreate = () => {
    this.props.createSfilter(this.props.filter)
  }

  render () {
    let { filter, sfilterIsDirty, currentUser, secrets, actualFilterIsDirty } = this.props
    let canUpdate = canUpdateFilter(filter, currentUser, secrets)
    let canEditName = actualFilterIsDirty || canUpdate

    return (
      <div className={th.SfilterBar}>
        <NameEditor
          value={filter.name}
          onChange={this.onNameChange}
          canEdit={canEditName}/>
        <SaveButtons
          onCreate={this.onCreate}
          onUpdate={this.onUpdate}
          isDirty={sfilterIsDirty}
          canUpdate={canUpdate}
          isSaved={!!filter.sid}/>
      </div>
    )
  }
}
