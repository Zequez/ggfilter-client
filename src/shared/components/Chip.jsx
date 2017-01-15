import th from './Chip.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'

const TooltipDiv = tooltipFactory('div', { position: 'top' })

export default class Chip extends Component {
  static propTypes = {
    icon: t.string,
    iconText: t.oneOfType([t.string, t.number]),
    onRemove: t.func,
    onClick: t.func,
    className: t.string,
    tooltip: t.string,
    children: t.any
  }

  static defaultProps = {
    onClick: () => {}
  }

  render () {
    const { icon, iconText, onRemove, children, onClick, className, tooltip } = this.props

    return (
      <TooltipDiv className={cx(th.Chip, className)} tooltip={tooltip}>
        { icon ? (
          <Icon
            icon={icon}
            className={th.Chip__Icon}
            onClick={onClick}/>
        ) : null }
        { iconText ? (
          <span className={th.Chip__Icon} onClick={onClick}>{iconText}</span>
        ) : null }
        <span className={th.Chip__text} onClick={onClick}>
          {children}
        </span>
        { onRemove ? (
          <Icon icon='remove-chip' className={th.Chip__remove} onClick={onRemove}/>
        ) : null }
      </TooltipDiv>
    )
  }
}
