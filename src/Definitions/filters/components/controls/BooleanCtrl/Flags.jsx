import th from './BooleanCtrl.sass'
import React, { PropTypes as t, Component } from 'react'
import enumColumns from '../../../../enumColumns'

import Checkbox from './Checkbox'

export default class Flags extends Component {
  static propTypes = {
    value: t.number.isRequired,
    enumType: t.string.isRequired,
    onChange: t.func.isRequired
  }

  enumValues = {}
  enumKeys = []
  componentWillMount () {
    let enumType = this.props.enumType
    this.enumValues = enumColumns.values[enumType]
    this.enumKeys = Object.keys(this.enumValues)
  }

  onChange (name, checked) {
    let { value } = this.props
    let flagValue = this.enumValues[name]

    let newVal = checked
      ? value | flagValue
      : value - (value & flagValue)

    this.props.onChange(newVal)
  }

  isChecked = (name) =>
    (this.enumValues[name] & this.props.value) > 0

  render () {
    let { enumType } = this.props

    return (
      <div className={th.BooleanCtrl__Flags}>
        {this.enumKeys.map((name) => (
          <Checkbox
            key={name}
            name={name}
            enumType={enumType}
            value={this.isChecked(name)}
            onChange={this.onChange.bind(this, name)}
          />
        ))}
      </div>
    )
  }
}
