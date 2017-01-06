import th from './TimeSpanInput.sass'
import React, { PropTypes as t, Component } from 'react'
import NumericInput from './NumericInput'
import cx from 'classnames'

const YY = 365 * 24 * 60 * 60
const MM = 30 * 24 * 60 * 60
const DD = 24 * 60 * 60

export default class TimeSpanInput extends Component {
  static propTypes = {
    value: t.number,
    onChange: t.func.isRequired
  }

  state = {
    y: null,
    m: null,
    d: null
  }

  componentWillMount () {
    this.setValues(this.props)
  }

  componentWillReceiveProps (props) {
    this.setValues(props)
  }

  setValues (props) {
    let [y, m, d] = this.valueToTimes(props.value)
    this.setState({y, m, d})
  }

  valueToTimes (value) {
    if (value == null) return []
    let y = Math.floor(value / YY)
    value = value % YY
    let m = Math.floor(value / MM)
    value = value % MM
    let d = Math.floor(value / DD)
    return [y || null, m || null, d || null]
  }

  timesToValue (y, m, d) {
    y = y == null ? this.state.y || 0 : y
    m = m == null ? this.state.m || 0 : m
    d = d == null ? this.state.d || 0 : d
    return y * YY + m * MM + d * DD
  }

  onChangeYears = (y) => {
    this.props.onChange(this.timesToValue(y || 0))
  }

  onChangeMonths = (m) => {
    this.props.onChange(this.timesToValue(null, m || 0))
  }

  onChangeDays = (d) => {
    this.props.onChange(this.timesToValue(null, null, d || 0))
  }

  render () {
    let {y, m, d} = this.state

    return (
      <div className={cx(this.props.className, th.TimeSpanInput)}>
        <NumericInput
          className={th.TimeSpanInput__Input}
          value={y}
          min={0}
          max={100}
          decimal={false}
          label='Years'
          onChange={this.onChangeYears}/>
        <NumericInput
          className={th.TimeSpanInput__Input}
          value={m}
          min={0}
          max={12}
          decimal={false}
          label='Months'
          onChange={this.onChangeMonths}/>
        <NumericInput
          className={th.TimeSpanInput__Input}
          value={d}
          max={0}
          max={30}
          decimal={false}
          label='Days'
          onChange={this.onChangeDays}/>
      </div>
    )
  }
}
