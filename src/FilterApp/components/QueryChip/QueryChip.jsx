import th from './QueryChip.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { capitalizeFirstLetter } from 'shared/lib/utils'
import generateQueryTitle from '../../lib/generateQueryTitle'

import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'
import * as chips from './chips'

const TooltipDiv = tooltipFactory('div', { position: 'top' })

export default class QueryChip extends Component {
  static propTypes = {
    query: t.oneOfType([t.object, t.bool]),
    filter: t.object, // Definition
    icon: t.bool,
    onRemove: t.func.isRequired,
    onClick: t.func,
    className: t.string
  }

  static defaultProps = {
    icon: true
  }

  isQueryEmpty (query) {
    const queryKeys = Object.keys(query)
    return (
      typeof query !== 'object' ||
      (queryKeys.length === 1 && queryKeys[0] === 'hl')
    )
  }

  render () {
    const { query, filter, icon, onRemove, children, onClick, className } = this.props
    const queryIsEmpty = this.isQueryEmpty(query)

    const ChipComponent = chips[filter.chip]
    const divClassName = cx(th.QueryChip, className, {
      [th.QueryChip_hl]: !!query.hl
    })

    let tooltip
    if (!queryIsEmpty) {
      let tooltipPre = query.hl ? 'Highlighting: ' : 'Filtering by: '
      tooltip = tooltipPre + capitalizeFirstLetter(generateQueryTitle(filter, query))
    }

    return (
      <TooltipDiv className={divClassName} tooltip={tooltip}>
        { icon ? (
          <Icon
            icon={'filter-' + filter.name}
            className={th.QueryChip__Icon}
            onClick={onClick}/>
        ) : null }
        { !queryIsEmpty ? (
          <span
            className={th.QueryChip__text}
            onClick={onClick}>
            <ChipComponent
              query={query}
              options={filter.chipOptions}
              name={filter.name}/>
          </span>
        ) : null}
        { !queryIsEmpty ? (
          <Icon icon='remove-chip' className={th.QueryChip__remove} onClick={onRemove}/>
        ) : null }
        {children}
      </TooltipDiv>
    )
  }
}
