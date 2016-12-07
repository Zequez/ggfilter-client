import th from './FilterChips.sass'
import React, { PropTypes as t, Component } from 'react'
import Icon from 'shared/components/Icon'
import * as chips from './chips'

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

    return (
      <div className={th.FilterChips__FilterChip} onClick={this.openControl}>
        { iconVisible ? (
          <Icon icon={'filter-' + filter.name} className={th.FilterChips__Icon}/>
        ) : null }
        <span className={th.FilterChips__text}>
          <ChipComponent query={query} options={filter.chipOptions}/>
        </span>
        <Icon icon='remove-chip' className={th.FilterChips__remove} onClick={onRemove}/>
      </div>
    )
  }
}
