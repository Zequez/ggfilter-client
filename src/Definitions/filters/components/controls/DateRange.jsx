import th from './DateRange.sass'
import React, { PropTypes as t, Component } from 'react'
import Input from 'shared/components/Input'

const inputToOutput = (inputValue) => {
  return inputValue == null ? null : new Date(inputValue).valueOf() / 1000
}

const outputToInput = (outputValue) => {
  if (outputValue == null) {
    return null
  } else {
    let d = new Date(outputValue * 1000)
    let month = d.getMonth() + 1
    if (month < 10) month = `0${month}`
    let day = d.getDate()
    if (day < 10) day = `0${day}`
    return d.getFullYear() + '-' + month + '-' + day
  }
}

export class DateRange extends Component {
  static propTypes = {
    query: t.shape({
      gt: t.number,
      lt: t.number
    }),
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      lt: null,
      gt: null
    }
  }

  onGtChange = (value) => {
    this.onChange(this.props.query.lt, inputToOutput(value))
  }

  onLtChange = (value) => {
    this.onChange(inputToOutput(value), this.props.query.gt)
  }

  onChange = (lt, gt) => {
    if (lt == null && gt == null) {
      this.props.onChange(null)
    } else {
      this.props.onChange({gt, lt})
    }
  }

  render () {
    let { gt, lt } = this.props.query

    return (
      <div className={th.DateRange}>
        <div className={th.DateRange__gt}>
          <span className={th.DateRange__label}>From</span>
          <Input
            className={th.DateRange__Input}
            type='date'
            value={outputToInput(gt)}
            onChange={this.onGtChange}/>
        </div>
        <div className={th.DateRange__lt}>
          <span className={th.DateRange__label}>To</span>
          <Input
            className={th.DateRange__Input}
            type='date'
            value={outputToInput(lt)}
            onChange={this.onLtChange}/>
        </div>
      </div>
    )
  }
}
