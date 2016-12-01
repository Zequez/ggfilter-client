import React, { PropTypes as t, Component } from 'react'

export default class ColumnsWidthFixator extends Component {
  static propTypes = {
    columnsWidth: t.arrayOf(t.number).isRequired
  }

  shouldComponentUpdate (np) {
    let tp = this.props
    return np.columnsWidth.toString() !== tp.columnsWidth.toString()
  }

  render () {
    return (
      <tr className='columns-width-fixer'>
        {this.props.columnsWidth.map((width, i) => (
          <th key={i} style={{width: `${width}px`}}></th>
        ))}
      </tr>
    )
  }
}
