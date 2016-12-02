import th from '../theme'
import React, { Component, PropTypes as t } from 'react'
import cn from 'classnames'

class Title extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    sort: t.oneOf([true, false, null]),
    onSort: t.func.isRequired,
    active: t.bool.isRequired,
    highlightMode: t.bool.isRequired
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    return (
      np.filter !== p.filter ||
      np.sort !== p.sort ||
      np.active !== p.active ||
      np.highlightMode !== p.highlightMode ||
      np.children !== p.children
    )
  }

  onSort = (ev) => {
    if (this.props.filter.sort) this.props.onSort(this.props.filter)
    if (this.props.onClick) this.props.onClick(ev)
  }

  blockTooltipOnMouseEnter = (ev) => {
    // Prevent the tooltip from firing if the title is not overflowed
    if (this.props.onMouseEnter) {
      let overflow = this.refs.overflow
      if (overflow.clientWidth < overflow.scrollWidth) {
        this.props.onMouseEnter(ev)
      }
    }
  }

  render () {
    console.logRender('DataTableTitle')

    let {
      filter,
      sort,
      active,
      children,
      highlightMode,
      // Wrapper
      onSort, //eslint-disable-line no-unused-vars
      theme, //eslint-disable-line no-unused-vars
      className, //eslint-disable-line no-unused-vars
      ...other
    } = this.props

    let titleClass = cn(th.title, filter.name, {
      [th.sort]: sort != null,
      [th.sortAsc]: sort === true,
      [th.sortDesc]: sort === false,
      [th.titleActive]: active,
      [th.titleHighlighted]: highlightMode,
      [th.titleSortable]: !!filter.sort
    })

    // Show tooltip ONLY if the object is overflowed
    let statusTooltip = active ? (highlightMode
      ? 'Results are being highlighted'
      : 'Results are being filtered')
      : ''

    return (
      <th
        ref='th'
        className={titleClass}
        {...other}
        onClick={this.onSort}
        onMouseEnter={this.blockTooltipOnMouseEnter}>
        <div className={th.titleOverflow} ref='overflow'>
          {sort != null ? (
            <span className={cn(th.titleSortIcon, 'fa', 'icon-sort-' + (sort ? 'asc' : 'desc'))}></span>
          ) : null}
          <span className={cn(th.titleIcon, 'fa', 'icon-filter-' + filter.name)}></span>
          <span className={th.titleText}>
            {filter.title}
          </span>
          {children}
        </div>
        <div className={th.titleStatus} title={statusTooltip}>*</div>
      </th>
    )
  }
}

export default Title
