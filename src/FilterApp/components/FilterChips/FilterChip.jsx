import th from './FilterChips.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { capitalizeFirstLetter } from 'shared/lib/utils'
import generateQueryTitle from '../../lib/generateQueryTitle'

import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'
import * as chips from './chips'

const TooltipDiv = tooltipFactory('div', { position: 'top' })

export default class FilterChip extends Component {
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
    const className = cx(th.FilterChips__FilterChip, {
      [th.FilterChips__FilterChip_hl]: !!query.hl
    })

    const tooltipPre = query.hl ? 'Highlighting: ' : 'Filtering by: '
    const tooltip = tooltipPre + capitalizeFirstLetter(generateQueryTitle(filter, query))

    return (
      <TooltipDiv className={className} onClick={this.openControl} tooltip={tooltip}>
        { iconVisible ? (
          <Icon icon={'filter-' + filter.name} className={th.FilterChips__Icon}/>
        ) : null }
        <span className={th.FilterChips__text}>
          <ChipComponent query={query} options={filter.chipOptions}/>
        </span>
        <Icon icon='remove-chip' className={th.FilterChips__remove} onClick={onRemove}/>
      </TooltipDiv>
    )
  }
}
