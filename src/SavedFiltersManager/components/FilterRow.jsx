import React, { PropTypes as t, Component } from 'react'
import { appropiateFilterPath } from 'shared/lib/appropiateFilterPath'
import { timeAgo } from 'shared/lib/utils'

export default class FilterRow extends Component {
  static propTypes = {
    sfilter: t.object.isRequired,
    onLoad: t.func.isRequired,
    onGo: t.func.isRequired,
    onEdit: t.func.isRequired,
    onDelete: t.func.isRequired,
    currentlyLoaded: t.bool.isRequired
  }

  state = {
    confirmingDelete: false
  }

  onClickLink = (ev) => {
    ev.preventDefault()
    this.props.onGo()
  }

  onDelete = (ev) => {
    if (this.state.confirmingDelete) {
      this.props.onDelete()
    } else {
      this.setState({confirmingDelete: true})
    }
  }

  cancelDelete = (ev) => {
    ev.stopPropagation()
    this.setState({confirmingDelete: false})
  }

  render () {
    let { sfilter: f, onLoad, onEdit, currentlyLoaded } = this.props
    let { confirmingDelete } = this.state
    let path = appropiateFilterPath(f)

    let active = currentlyLoaded ? ' active' : ''
    let createdAt = new Date(f.createdAt)
    let updatedAt = new Date(f.updatedAt)

    let deleteText = confirmingDelete
      ? <span>Yes?<span className='cancel-delete' onClick={this.cancelDelete}>No</span></span>
      : 'Delete'

    return (
      <tr className={'saved-filter-row' + active}>
        <td><a href={path} onClick={this.onClickLink}>{path}</a></td>
        <td>{f.name}</td>
        <td title={f.createdAt}>{timeAgo(createdAt)} ago</td>
        <td title={f.updatedAt}>{timeAgo(updatedAt)} ago</td>
        <td className='saved-filter-row-visits'>{f.visits}</td>
        <td className='saved-filter-row-actions'>
          <button className='btn' onClick={onLoad}>Load</button>
          <button className='btn' onClick={onEdit}>Edit</button>
          <button className='btn delete-button' onClick={this.onDelete}>{deleteText}</button>
        </td>
      </tr>
    )
  }
}
