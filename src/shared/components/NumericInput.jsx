import React, { PropTypes as t, Component } from 'react'
import Input from './Input'

export default class NumericInput extends Component {
  static propTypes = {
    value: t.number,
    onChange: t.func.isRequired,
    selectOnFocus: t.bool
  }

  defaultProps = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
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
      newValue = parseFloat(value)

      if (newValue < this.props.min) {
        newValue = this.props.min
      } else if (newValue > this.props.max) {
        newValue = this.props.max
      }
    } else {
      newValue = null
    }

    if (newValue !== this.state.value) {
      this.setState({newValue})
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
      selectOnFocus, //eslint-disable-line no-unused-vars
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
