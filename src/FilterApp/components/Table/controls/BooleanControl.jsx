import th from './BooleanControl.sass'
import React, { Component, PropTypes as t } from 'react'

import enumColumns from '../../../config/enumColumns'
import cx from 'classnames'
import rippleFactory from 'shared/components/Ripple'
import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'

const LabelPlus = tooltipFactory(rippleFactory()('label'), {position: 'top'})

export default class BooleanControl extends Component {
  static propTypes = {
    query: t.shape({
      value: t.number,
      or: t.bool
    }).isRequired,
    name: t.string.isRequired,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    query: {
      value: 0,
      or: false
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      or: props.query.or,
      value: props.query.value,
      enumValues: enumColumns.values[props.name],
      enumNames: enumColumns.names[props.name]
    }

    this.state.keys = Object.keys(this.state.enumValues)
  }

  componentWillUpdate (np) {
    this.state.or = np.query.or
    this.state.value = np.query.value
  }

  checked (val) {
    return (this.state.value & val) > 0
  }

  onValueChange = (ev) => {
    let checked = ev.target.checked
    let val = ev.target.value
    let currentVal = this.props.query.value
    let newVal

    if (checked) {
      newVal = currentVal | val
    } else {
      newVal = currentVal - (currentVal & val)
    }

    this.setState({value: newVal})
    if (newVal) {
      this.props.onChange({value: newVal, or: this.state.or})
    } else {
      this.props.onChange(null)
    }
  }

  onOperatorChange = (ev) => {
    let or = ev.target.checked
    let val = this.state.value
    this.setState({or: or})
    if (val) this.props.onChange({value: val, or: or})
  }

  render () {
    let enumType = this.props.name
    let inputs = []
    this.state.keys.forEach((key) => {
      let val = this.state.enumValues[key]
      let name = this.state.enumNames[key]
      let checked = this.checked(val)

      let labelClass = cx(th.BooleanControl__Label, {
        [th.BooleanControl__Label_checked]: checked
      })

      let id = `boolean-${enumType}-${key}`

      inputs.push(
        <input
          id={id}
          key={key}
          className={th.BooleanControl__Input}
          type='checkbox'
          value={val}
          checked={checked}
          onChange={this.onValueChange}/>
      )

      inputs.push(
        <LabelPlus key={key + 'l'} className={labelClass} tooltip={name} htmlFor={id}>
          <Icon icon={'boolean-' + key} className={th.BooleanControl__Icon}/>
          <span className={th.BooleanControl__Title}>{name}</span>
        </LabelPlus>
      )
    })

    let opId = `boolean-${enumType}-operator`

    let operatorLabelClass = cx(th.BooleanControl__OperatorLabel, {
      [th.BooleanControl__OperatorLabel_or]: this.state.or,
      [th.BooleanControl__OperatorLabel_and]: !this.state.or
    })

    return (
      <div className={th.BooleanControl}>
        {inputs}
        <input
          type='checkbox'
          className={th.BooleanControl__OperatorInput}
          checked={this.state.or}
          id={opId}
          onChange={this.onOperatorChange}/>
        <LabelPlus className={operatorLabelClass} htmlFor={opId} tooltip='AND/OR'>
          <div className={th.BooleanControl__OperatorSlider}>
            <span className={th.BooleanControl__OperatorAnd}>AND</span>
            <span className={th.BooleanControl__OperatorOr}>OR</span>
          </div>
        </LabelPlus>
      </div>
    )
  }
}
