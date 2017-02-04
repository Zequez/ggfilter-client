import th from './TitlesList.sass'
import React, { Component, PropTypes as t } from 'react'
import cx from 'classnames'

class Title extends Component {
  static propTypes = {
    column: t.object.isRequired,
    sort: t.oneOf([true, false, null]),
    onSort: t.func.isRequired,
    active: t.bool.isRequired,
    highlightMode: t.bool.isRequired
  }

  shouldComponentUpdate (np, ns) {
    let p = this.props
    return (
      np.column !== p.column ||
      np.sort !== p.sort ||
      np.active !== p.active ||
      np.highlightMode !== p.highlightMode ||
      np.children !== p.children
    )
  }

  onSort = (ev) => {
    if (this.props.column.sort) this.props.onSort(this.props.column)
    if (this.props.onClick) this.props.onClick(ev)
  }

  blockTooltipOnMouseEnter = (ev) => {
    // Prevent the tooltip from firing if the title is not overflowed
    if (this.props.onMouseEnter) {
      let overflow = this.refs.overflow
      if (overflow.clientWidth < overflow.scrollWidth || this.props.column.longTitle) {
        this.props.onMouseEnter(ev)
      }
    }
  }

  render () {
    console.logRender('DataTableTitle')

    let {
      column,
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

    const titleClass = cx(th.TitlesList__Title, column.name, {
      [th.TitlesList__Title_sorted]: sort != null,
      // [th.sortAsc]: sort === true,
      // [th.sortDesc]: sort === false,
      [th.TitlesList__Title_left]: column.alignment === -1,
      [th.TitlesList__Title_center]: column.alignment === 0,
      [th.TitlesList__Title_right]: column.alignment === 1,
      [th.TitlesList__Title_active]: active,
      [th.TitlesList__Title_highlighted]: highlightMode,
      [th.TitlesList__Title_sortable]: !!column.sort
    })

    const sortIconClass = cx(th.TitlesList__SortIcon, 'fa', 'icon-sort-' + (sort ? 'asc' : 'desc'))

    return (
      <th
        ref='th'
        className={titleClass}
        {...other}
        onClick={this.onSort}
        onMouseEnter={this.blockTooltipOnMouseEnter}>
        <div className={th.TitlesList__Overflow} ref='overflow'>
          {sort != null ? (
            <span className={sortIconClass}></span>
          ) : null}

          <span className={th.TitlesList__Text}>
            {column.title}
          </span>
          {children}
        </div>
      </th>
    )
  }
}

export default Title
