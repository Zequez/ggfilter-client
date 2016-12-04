import th from './RangeControl.sass'
import React, { PropTypes as t, Component } from 'react'
import NumericInput from 'shared/components/NumericInput'

const defaultOptions = {
  minHint: 'Min',
  maxHint: 'Max',
  toInput: (value) => value,
  fromInput: (value) => value,
  prefix: null
}

export default class RangeControl extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.shape({
      minHint: t.string,
      maxHint: t.string,
      toInput: t.func,
      fromInput: t.func
    }).isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      gt: null,
      lt: null
    }
  }

  componentWillMount () {
    this.options = {...defaultOptions, ...this.props.options}
  }

  fromInput (value) {
    return value === null || value === Infinity || value === ''
      ? null
      : this.options.fromInput(value)
  }

  toInput (value) {
    return value == null
      ? null
      : this.options.toInput(value)
  }

  onMinChange = (value) => {
    this.onChange(this.fromInput(value), this.props.query.lt)
  }

  onMaxChange = (value) => {
    this.onChange(this.props.query.gt, this.fromInput(value))
  }

  onChange = (gt, lt) => {
    if (gt === undefined) gt = this.props.query.gt
    if (lt === undefined) lt = this.props.query.lt

    if (gt == null && lt == null) {
      this.props.onChange(null)
    } else if (this.props.query.gt !== gt || this.props.query.lt !== lt) {
      this.props.onChange({gt, lt})
    }
  }

  render () {
    let { query: { gt, lt } } = this.props

    return (
      <div className={th.RangeControl}>
        <NumericInput
          className={th.RangeControl__NumericInput_start}
          value={this.toInput(gt)}
          onChange={this.onMinChange}
          fixedLabel={this.options.prefix}
          label={this.options.minHint}/>
        <NumericInput
          className={th.RangeControl__NumericInput_end}
          value={this.toInput(lt)}
          onChange={this.onMaxChange}
          fixedLabel={this.options.prefix}
          label={this.options.maxHint}/>
      </div>
    )
  }
}
