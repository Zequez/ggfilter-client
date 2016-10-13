import React, { PropTypes as t, Component } from 'react'
import { appropiateFilterPath } from 'lib/appropiateFilterPath'

export default class FilterRow extends Component {
  static propTypes = {
    sfilter: t.object.isRequired,
    onLoad: t.func.isRequired,
    onGo: t.func.isRequired,
    onEdit: t.func.isRequired,
    onDelete: t.func.isRequired,
    currentlyLoaded: t.bool.isRequired
  }

  onClickLink = (ev) => {
    ev.preventDefault()
    this.props.onGo()
  }

  render () {
    let { sfilter: f, onLoad, onEdit, onDelete, currentlyLoaded } = this.props
    let path = appropiateFilterPath(f)

    let active = currentlyLoaded ? ' active' : ''

    return (
      <tr className={'saved-filter-row' + active}>
        <td><a href={path} onClick={this.onClickLink}>{path}</a></td>
        <td>{f.name}</td>
        <td>{f.createdAt}</td>
        <td>{f.updatedAt}</td>
        <td>{f.visits}</td>
        <td>
          <button onClick={onLoad}>Load</button>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </td>
      </tr>
    )
  }
}
