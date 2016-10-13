import React, { PropTypes as t, Component } from 'react'
import { appropiateFilterPath } from 'lib/appropiateFilterPath'

export default class FilterRow extends Component {
  static propTypes = {
    sfilter: t.object.isRequired,
    onLoad: t.func.isRequired,
    onEdit: t.func.isRequired,
    onDelete: t.func.isRequired
  }

  onClickLink = (ev) => {
    ev.preventDefault()
    this.props.onLoad()
  }

  render () {
    let { sfilter: f, onLoad, onEdit, onDelete } = this.props
    let path = appropiateFilterPath(f)

    return (
      <tr>
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
