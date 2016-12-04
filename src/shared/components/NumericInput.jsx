import React, { PropTypes as t, Component } from 'react'
import Input from './Input'

export default class NumericInput extends Component {
  static propTypes = {
    value: t.number,
    onChange: t.func.isRequired
  }

  state = {}

  componentWillMount () {
    this.state.value = this.props.value
  }

  componentWillReceiveProps (np) {
    this.state.value = np.value
  }

  onChange = (value) => {
    value = value.replace(/,/g, '.')
    if ((value.match(/\./g) || []).length > 1) return

    let valid = false
    let newValue

    if (/^[0-9.]+$/.test(value)) {
      if (value !== '.') newValue = Number(value)
      valid = true
    }

    if (value === '') {
      newValue = null
      valid = true
    }

    if (valid) {
      if (newValue !== undefined && newValue !== this.props.value) {
        this.props.onChange(newValue)
      }
      this.setState({value: value})
    }
  }

  render () {
    const { value } = this.state

    return (
      <Input
        {...this.props}
        value={value == null ? null : value.toString()}
        type='numeric'
        onChange={this.onChange}>
      </Input>
    )
  }
}
