import th from './RangeControl.sass'
import React, { PropTypes as t, Component } from 'react'
import EditableDropdown from 'shared/components/EditableDropdown'

class OptionsManager {
  constructor (options, toInput) {
    this.toInput = toInput
    this.options = options
    this.min = this.options.concat([])
    this.max = this.options.concat([])

    this.min.pop()
    this.max.shift()
  }

  minRestricted (gt, lt) {
    let min = this.min
    if (lt != null) {
      let result = []
      min.some((arr, i) => arr[1] < lt ? !result.push(arr) : true)
      min = result
    }

    let result = this._arrToInput(min)
    if (gt != null) result.unshift(['', null])
    return result
  }

  maxRestricted (gt, lt) {
    let max = lt == null ? this._removeNull(this.max) : this.max
    if (gt != null) {
      let result = []
      max.concat([]).reverse().some((arr, i) => arr[1] > gt ? !result.unshift(arr) : true)
      max = result
    }

    let result = this._arrToInput(max)
    if (lt != null) result.unshift(['', null])
    return result
  }

  _arrToInput (arr) {
    return arr.map((pair) => [pair[0], this.toInput(pair[1])])
  }

  _removeNull (arr) {
    let result = arr
    result.some((p, i) => {
      if (p[1] == null) {
        result = arr.concat([])
        result.splice(i, 1)
        return true
      }
    })
    return result
  }
}

const defaultOptions = {
  options: [],
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
      options: t.arrayOf(t.array),
      minHint: t.string,
      maxHint: t.string,
      toInput: t.func,
      fromInput: t.func,
      shortcuts: t.arrayOf(t.array)
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
    this.selectOptions = new OptionsManager(this.options.options, this.options.toInput)
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

    let min = this.selectOptions.minRestricted(gt, lt)
    let max = this.selectOptions.maxRestricted(gt, lt)

    return (
      <div className={th.RangeControl}>
        <EditableDropdown
          className={th.RangeControl__EditableDropdown_start}
          value={this.toInput(gt)}
          onChange={this.onMinChange}
          fixedLabel={this.options.prefix}
          label={this.options.minHint}
          numeric
          options={min}/>
        <EditableDropdown
          className={th.RangeControl__EditableDropdown_end}
          value={this.toInput(lt)}
          onChange={this.onMaxChange}
          fixedLabel={this.options.prefix}
          label={this.options.maxHint}
          numeric
          options={max}/>
      </div>
    )
  }
}
