import th from './BooleanControl.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

import enumColumns from '../../../../config/enumColumns'
import TooltipLabel from './TooltipLabel'
import Icon from 'shared/components/Icon'

export default class Checkbox extends Component {
  static propTypes = {
    value: t.bool.isRequired,
    onChange: t.func.isRequired,
    enumType: t.string.isRequired,
    name: t.string.isRequired
  }

  onChange = (ev) => {
    this.props.onChange(ev.target.checked)
  }

  render () {
    let { value, enumType, name } = this.props

    let title = enumColumns.names[enumType][name]
    let icon = `boolean-${enumType}-${name}`
    let className = cx(th.BooleanControl__Checkbox, {
      [th.BooleanControl__Checkbox_checked]: value
    })

    return (
      <TooltipLabel
        className={className}
        tooltip={title}
        rippleDisabled={value}>
        <input
          className={th.BooleanControl__Input}
          type='checkbox'
          checked={value}
          onChange={this.onChange}/>
        <Icon icon={icon} className={th.BooleanControl__Icon}/>
        <span className={th.BooleanControl__Title}>{title}</span>
      </TooltipLabel>
    )
  }
}
