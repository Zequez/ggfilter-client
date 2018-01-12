import th from './columns.sass'
import React, { Component, PropTypes as t } from 'react'
import enumColumns from '../../../enumColumns'
import cx from 'classnames'
import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'

const TooltipIcon = tooltipFactory(Icon, { position: 'top' })

export class BooleanCell extends Component {
  static propTypes = {
    value: t.number.isRequired,
    name: t.string.isRequired
  }

  constructor (props) {
    super(props)
    this.values = enumColumns.values[props.name]
    this.names = enumColumns.names[props.name]
    this.keys = Object.keys(this.values)
  }

  checked (val) {
    return (this.props.value & val) > 0
  }

  render () {
    return (
      <div className={th.Boolean}>
        {this.keys.map((k) => (
          <TooltipIcon
            tooltip={this.names[k]}
            key={k}
            icon={`boolean-${this.props.name}-${k}`}
            className={cx(
              th.Boolean__Icon, {
                [th.Boolean__Icon_disabled]: !this.checked(this.values[k])
              })
            }
          />
        ))}
      </div>
    )
  }
}
