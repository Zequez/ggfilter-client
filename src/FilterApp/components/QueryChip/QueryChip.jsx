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
    iconVisible: t.bool,
    onRemove: t.func.isRequired
  }

  static defaultProps = {
    iconVisible: true
  }

  openControl = () => {

  }

  render () {
    const { query, filter, iconVisible, onRemove } = this.props

    const ChipComponent = chips[filter.chip]
    const className = cx(th.QueryChip, {
      [th.QueryChip_hl]: !!query.hl
    })

    const tooltipPre = query.hl ? 'Highlighting: ' : 'Filtering by: '
    const tooltip = tooltipPre + capitalizeFirstLetter(generateQueryTitle(filter, query))

    return (
      <TooltipDiv className={className} onClick={this.openControl} tooltip={tooltip}>
        { iconVisible ? (
          <Icon icon={'filter-' + filter.name} className={th.QueryChip__Icon}/>
        ) : null }
        <span className={th.QueryChip__text}>
          <ChipComponent query={query} options={filter.chipOptions} name={filter.name}/>
        </span>
        <Icon icon='remove-chip' className={th.QueryChip__remove} onClick={onRemove}/>
      </TooltipDiv>
    )
  }
}
