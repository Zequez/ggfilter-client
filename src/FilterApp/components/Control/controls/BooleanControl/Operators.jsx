import th from './BooleanControl.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

import TooltipLabel from './TooltipLabel'

export default class Operators extends Component {
  static propTypes = {
    modes: t.arrayOf(t.oneOf(['and', 'or', 'xor'])).isRequired,
    value: t.oneOf(['and', 'or', 'xor']).isRequired,
    onChange: t.func.isRequired
  }

  onClick = () => {
    let { value, modes } = this.props
    let newMode = modes[modes.indexOf(value) + 1] || modes[0]
    this.props.onChange && this.props.onChange(newMode)
  }

  render () {
    let { modes, value } = this.props

    let modesTitles = modes.map((m) => m.toUpperCase())
    let tooltip = modesTitles.join('/')

    let className = cx(
      th.BooleanControl__Operators,
      th['BooleanControl__Operators_' + value]
    )

    let valueIndex = modes.indexOf(value)
    let transform = {
      transform: `translateY(-${100 * valueIndex}%)`
    }

    return (
      <TooltipLabel
        className={className}
        tooltip={tooltip}
        onClick={this.onClick}>
        {modes.map((mode, i) =>
          <span
            key={mode}
            style={transform}
            className={cx(th.BooleanControl__Operator, {
              [th.BooleanControl__Operator_active]: mode === value
            })}>
            {modesTitles[i]}
          </span>
        )}
      </TooltipLabel>
    )
  }
}
