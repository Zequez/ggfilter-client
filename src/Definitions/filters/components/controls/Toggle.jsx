import React, { Component, PropTypes as t } from 'react'

export default class Toggle extends Component {
  static propTypes = {
    query: t.shape({
      value: t.boolean
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      value: false
    }
  }

  onValueChange = (ev) => {
    let val = Number(ev.target.value)
    if (val === -1) {
      this.props.onChange(null)
    } else {
      this.props.onChange({value: !!val})
    }
  }

  render () {
    let {value} = this.props

    return (
      <span>
        <select value={value} onChange={this.onValueChange}>
          <option value={-1}>-</option>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>
      </span>
    )
  }
}
