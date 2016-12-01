import th from '../theme'
import React, { Component, PropTypes as t } from 'react'
import classNames from 'classnames'

import Ripple from 'react-toolbox/lib/ripple'
import ResizeHandle from './ResizeHandle'
import TitleButtons from './TitleButtons'

class Title extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    sort: t.oneOf([true, false, null]),
    onSort: t.func.isRequired,
    onResize: t.func.isRequired,
    onResetResize: t.func.isRequired,
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

  onSort () {
    if (this.props.filter.sort) this.props.onSort(this.props.filter)
  }

  onResize (deltaX) {
    this.props.onResize(this.props.filter, deltaX)
  }

  onResetResize () {
    this.props.onResetResize(this.props.filter)
  }

  render () {
    console.logRender('DataTableTitle')
    let { filter, sort, active, children, onMouseDown, onTouchStart } = this.props

    let titleClass = classNames(th.title, filter.name, {
      [th.sort]: sort != null,
      [th.sortAsc]: sort === true,
      [th.sortDesc]: sort === false,
      [th.titleActive]: active,
      [th.titleSortable]: !!filter.sort
    })

    // let icon = <i className={'fa icon-filter-' + filter.name}></i>

    return (
      <th
        ref='th'
        className={titleClass}
        onClick={::this.onSort}
        onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        {sort != null ? (
          <span className={th.titleSortIcon}>
            <i className={'fa icon-sort-' + (sort ? 'asc' : 'desc') }></i>
          </span>
        ) : null}
        <span className={th.titleIcon}>
          <i className={'fa icon-filter-' + filter.name}></i>
        </span>
        <span className={th.titleText}>
          {filter.title}
        </span>
        {/*{ this.props.active ? (
          <TitleButtons
            mode={this.props.highlightMode}
            onSetHighlightMode={this.props.onSetHighlightMode}
            onClearFilter={this.props.onClearFilter}/>
        ) : null}*/}
        {/*<div className='title-highlight-border'></div>*/}
        {/*<ResizeHandle
          onStop={::this.onResize}
          onDoubleClick={::this.onResetResize}/>*/}
        {children}
      </th>
    )
  }
}

export const SortableTitle = Ripple()(Title)
export default Title
