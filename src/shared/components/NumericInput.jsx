import React, { PropTypes as t, Component } from 'react'
import Input from './Input'

export default class NumericInput extends Component {
  static propTypes = {
    value: t.number,
    onChange: t.func.isRequired,
    selectOnFocus: t.bool,
    decimal: t.bool
  }

  defaultProps = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    decimal: true,
    selectOnFocus: false
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
    let newValue = value

    if (newValue !== '') {
      newValue = this.props.decimal ? parseFloat(value) : parseInt(value)

      if (newValue < this.props.min) {
        newValue = this.props.min
      } else if (newValue > this.props.max) {
        newValue = this.props.max
      }
    } else {
      newValue = null
    }

    if (newValue !== this.state.value) {
      this.setState({value: newValue})
    }

    if (newValue !== this.props.value) {
      this.props.onChange(newValue)
    }
  }

  onFocus = (value) => {
    if (this.props.selectOnFocus) {
      this.select()
    }
  }

  render () {
    const { value } = this.state
    const {
      selectOnFocus, decimal, //eslint-disable-line no-unused-vars
      ...other
    } = this.props

    return (
      <Input
        {...other}
        ref='input'
        value={value == null ? null : value.toString()}
        type='number'
        onFocus={this.onFocus}
        onChange={this.onChange}>
      </Input>
    )
  }
}
