import th from './SingleTimespanInput.sass'
import React, { PropTypes as t, Component } from 'react'
import NumericInput from './NumericInput'
import Dropdown from './Dropdown'
import cx from 'classnames'

const units = [
  ['Years', 365 * 24 * 60 * 60],
  ['Months', 30 * 24 * 60 * 60],
  ['Weeks', 7 * 24 * 60 * 60],
  ['Days', 24 * 60 * 60],
  ['Hours', 60 * 60]
]

export default class SingleTimespanInput extends Component {
  static propTypes = {
    value: t.number,
    onChange: t.func.isRequired,
    hint: t.string
  }

  state = {
    unit: 0
  }

  componentWillMount () {
    this.detectUnit()
  }

  detectUnit () {
    if (this.props.value != null) {
      let unit = 0
      units.some(([label, value], index) => {
        unit = index
        return this.props.value % value === 0
      })

      this.setState({unit})
    }
  }

  getUnitValue (unit = this.state.unit) {
    return units[unit][1]
  }

  getShownValue () {
    let { value } = this.props
    return value == null ? null : parseInt(value / this.getUnitValue())
  }

  onChangeUnit = (_, unit) => {
    let value = this.getShownValue()
    this.setState({unit})
    this.onChange(value, this.getUnitValue(unit))
  }

  onChange = (value, unitValue = this.getUnitValue()) => {
    this.props.onChange(value == null ? null : value * unitValue)
  }

  render () {
    let { className, hint } = this.props
    let { unit } = this.state
    let unitValue = units[unit][1]

    let shownValue = this.getShownValue()

    return (
      <div className={cx(className, th.SingleTimespanInput)}>
        <NumericInput
          className={th.SingleTimespanInput__Input}
          value={shownValue}
          min={0}
          max={100}
          decimal={false}
          hint={hint}
          onChange={this.onChange}/>
        <Dropdown
          className={th.SingleTimespanInput__Dropdown}
          value={unitValue}
          options={units}
          onChange={this.onChangeUnit}/>
      </div>
    )
  }
}
