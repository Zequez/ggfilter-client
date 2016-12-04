import React, { PropTypes as t, Component } from 'react'
import Input from './Input'

export default class NumericInput extends Component {
  static propTypes = {
    value: t.number,
    onChange: t.func.isRequired
  }

  defaultProps = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }

  state = {}

  componentWillMount () {
    this.state.value = this.props.value
  }

  componentWillReceiveProps (np) {
    this.state.value = np.value
  }

  focus () { this.refs.input.focus() }
  select () { this.refs.input.select() }

  onChange = (value) => {
    if (value !== '') {
      value = parseFloat(value)
      if (value < this.props.min) {
        value = this.props.min
      } else if (value > this.props.max) {
        value = this.props.max
      }
    } else {
      value = null
    }

    if (value !== this.state.value) {
      this.setState({value})
    }

    if (value !== this.props.value) {
      this.props.onChange(value)
    }
  }

  render () {
    const { value } = this.state

    return (
      <Input
        {...this.props}
        ref='input'
        value={value == null ? null : value.toString()}
        type='number'
        onChange={this.onChange}>
      </Input>
    )
  }
}
