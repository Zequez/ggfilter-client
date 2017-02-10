import th from './SfilterBar.sass'
import React, { PropTypes as t, Component } from 'react'
import Button from 'shared/components/Button'

export default class SaveButtons extends Component {
  static propTypes = {
    onCreate: t.func,
    onUpdate: t.func,
    isSaved: t.bool,
    isDirty: t.bool,
    canUpdate: t.bool
  }

  render () {
    let { isSaved, isDirty, canUpdate, onCreate, onUpdate } = this.props

    return isDirty ? (
      <div className={th.__SaveButtons}>
        {isSaved && canUpdate
          ? <Button raised={false} alt={true} onClick={onUpdate}>Update</Button>
          : null}
        <Button raised={false} alt={true} onClick={onCreate}>
          {isSaved ? 'Save as new' : 'Save'}
        </Button>
      </div>
    ) : null
  }
}
