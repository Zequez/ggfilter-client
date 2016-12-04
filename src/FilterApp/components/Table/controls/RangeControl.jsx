import th from './RangeControl.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { pairs, onClickOutsideOnce } from 'shared/lib/utils'
import EditableDropdown from 'shared/components/EditableDropdown'

const defaultLabels = {
  '': '{v}',
  '*-*': '{si} to {ei}',
  '*->': '≥{si}',
  '<-*': '≤{ei}',
  '<->': 'Any'
}

const defaultOptions = {
  options: {
    'Free': 0,
    'Non-free': 0.01,
    '$1': 1,
    '$2': 2,
    '$5': 5,
    '$10': 10,
    '$20': 20
  },
  minHint: 'Min',
  maxHint: 'Max',
  toInput: (value) => value / 100,
  fromInput: (value) => value * 100,
  prefix: '$',
  labels: {},
  shortcuts: [
    [null, 0],
    [1, null],
    [1, 300],
    [1, 500],
    [1, 1000]
  ]
}

export default class RangeControl extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    options: t.shape({
      options: t.arrayOf(t.number),
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

  state = {
    floater: false
  }

  componentWillMount () {
    this.options = {...defaultOptions, ...this.props.options}
    this.options.labels = {...defaultLabels, ...this.options.labels}
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

  activateFloater = () => {
    if (!this.state.floater) {
      this.setState({floater: true})
      onClickOutsideOnce(this.refs.floater, this.deactivateFloater)
    }
  }

  deactivateFloater = () => {
    this.setState({floater: false})
  }

  render () {
    let { query: { gt, lt } } = this.props
    let { floater } = this.state

    let min = pairs(this.options.options)
    let max = min.concat([])
    min.pop()
    min.unshift(['', null])
    max.shift()
    max.unshift(['', null])

    const classNames = cx(th.RangeControl, {
      [th.RangeControl_floaterActive]: floater
    })

    return (
      <div className={classNames}>
        <div
          className={th.RangeControl__floater}
          onMouseUp={this.activateFloater}
          ref='floater'
        >
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
      </div>
    )
  }
}
