import th from './QueryChip.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { capitalizeFirstLetter } from 'shared/lib/utils'
import generateQueryTitle from '../../lib/generateQueryTitle'

import Icon from 'shared/components/Icon'
import tooltipFactory from 'shared/components/Tooltip'
import * as chips from './chips'
import ConnectedControlPop from '../ConnectedControlPop'

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

  state = {
    controlOpen: false,
    popTarget: null
  }

  openControl = (ev) => {
    this.setState({controlOpen: true, popTarget: ev.currentTarget})
  }

  closeControl = () => {
    this.setState({controlOpen: false, popTarget: null})
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
      <TooltipDiv className={className} tooltip={tooltip}>
        { iconVisible ? (
          <Icon
            icon={'filter-' + filter.name}
            className={th.QueryChip__Icon}
            onClick={this.openControl}/>
        ) : null }
        <span
          className={th.QueryChip__text}
          onClick={this.openControl}>
          <ChipComponent
            query={query}
            options={filter.chipOptions}
            name={filter.name}/>
        </span>
        <Icon icon='remove-chip' className={th.QueryChip__remove} onClick={onRemove}/>
        { this.state.controlOpen ? (
          <ConnectedControlPop
            query={query}
            filter={filter}
            target={this.state.popTarget}
            onClose={this.closeControl}/>
        ) : null }
      </TooltipDiv>
    )
  }
}
