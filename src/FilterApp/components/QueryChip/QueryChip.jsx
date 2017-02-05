import th from './QueryChip.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { capitalizeFirstLetter } from 'shared/lib/utils'
import generateQueryTitle from '../../lib/generateQueryTitle'
import { isQueryEmpty } from '../../lib/utils'

import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'
import * as chips from './chips'

const TooltipDiv = tooltipFactory('div', { position: 'top' })

export default class QueryChip extends Component {
  static propTypes = {
    query: t.oneOfType([t.object, t.bool]),
    control: t.object, // Definition
    icon: t.bool,
    onRemove: t.func,
    onClick: t.func,
    hl: t.bool.isRequired,
    className: t.string,
    tooltipPre: t.bool
  }

  static defaultProps = {
    icon: true,
    tooltipPre: true
  }

  render () {
    const { query, control, icon, onRemove,
            children, onClick, className, tooltipPre, hl } = this.props

    const ChipComponent = chips[control.chip]
    const divClassName = cx(th.QueryChip, className, {
      [th.QueryChip_hl]: hl
    })

    let tooltip = capitalizeFirstLetter(generateQueryTitle(control, query))
    if (tooltipPre) {
      tooltip = hl ? 'Highlighting: ' : 'Filtering by: ' + tooltip
    }

    return (
      <TooltipDiv className={divClassName} tooltip={tooltip}>
        { icon ? (
          <Icon
            icon={'filter-' + control.name}
            className={th.QueryChip__Icon}
            onClick={onClick}/>
        ) : null }
        <span
          className={th.QueryChip__text}
          onClick={onClick}>
          <ChipComponent
            query={query}
            options={control.chipOptions}
            name={control.name}/>
        </span>
        { onRemove ? (
          <Icon icon='remove-chip' className={th.QueryChip__remove} onClick={onRemove}/>
        ) : null }
        {children}
      </TooltipDiv>
    )
  }
}
