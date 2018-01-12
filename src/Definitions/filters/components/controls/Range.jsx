import th from './Range.sass'
import React, { PropTypes as t, Component } from 'react'
import NumericInput from 'shared/components/NumericInput'

const defaultOptions = {
  minHint: 'Min',
  maxHint: 'Max',
  toInput: (value) => value,
  fromInput: (value) => value,
  prefix: null,
  suffix: null,
  min: 0,
  max: 99999,
  focus: 'min'
}

export class Range extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    config: t.shape({
      minHint: t.string,
      maxHint: t.string,
      toInput: t.func,
      fromInput: t.func,
      prefix: t.string,
      min: t.number,
      max: t.number
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
    this.config = {...defaultOptions, ...this.props.config}
  }

  fromInput (value) {
    return value === null || value === Infinity || value === ''
      ? null
      : this.config.fromInput(value)
  }

  toInput (value) {
    return value == null
      ? null
      : this.config.toInput(value)
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

  focus () {
    if (this.config.focus === 'min') {
      this.refs.min.focus()
    } else if (this.config.focus === 'max') {
      this.refs.max.focus()
    }
  }

  render () {
    let { query: { gt, lt } } = this.props

    return (
      <div className={th.Range}>
        <NumericInput
          className={th.Range__NumericInput_start}
          value={this.toInput(gt)}
          onChange={this.onMinChange}
          prefix={this.config.prefix}
          suffix={this.config.suffix}
          min={this.config.min}
          max={this.config.max}
          selectOnFocus
          label={this.config.minHint}
          ref='min'/>
        <NumericInput
          className={th.Range__NumericInput_end}
          value={this.toInput(lt)}
          onChange={this.onMaxChange}
          prefix={this.config.prefix}
          suffix={this.config.suffix}
          min={this.config.min}
          max={this.config.max}
          selectOnFocus
          label={this.config.maxHint}
          ref='max'/>
      </div>
    )
  }
}
