/* @flow */
import th from './SfilterBar.sass'
import React from 'react'
import Button from 'shared/components/Button'

type Props = {
  onCreate: () => void,
  onUpdate: () => void,
  isSaved: boolean,
  isDirty: boolean,
  canUpdate: boolean
}

export default class SaveButtons extends React.Component {
  props : Props

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
