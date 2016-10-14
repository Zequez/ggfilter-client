import React, { Component, PropTypes as t } from 'react'
import { debounce } from 'shared/lib/utils'
import classNames from 'classnames'

import ColumnResizeHandle from './ColumnResizeHandle'
import DataTableTitleFilterButtons from './DataTableTitleFilterButtons'

export default class DataTableTitle extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    width: t.number.isRequired,
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
      np.width !== p.width ||
      np.sort !== p.sort ||
      np.active !== p.active ||
      np.highlightMode !== p.highlightMode
    )
  }

  overflowClass = 'overflowed'
  shouldCheckOverflow = true
  overflowed = false

  componentWillReceiveProps (np) {
    let p = this.props
    if (np.width !== p.width) {
      this.shouldCheckOverflow = true
    }
  }

  componentDidMount () { this.componentDidUpdate() }
  componentDidUpdate () {
    if (this.shouldCheckOverflow) this.checkOverflow()
  }

  checkOverflow = debounce(50, () => {
    this.shouldCheckOverflow = false
    let overflow = this.refs.overflow
    let th = this.refs.th
    let overflowed = overflow.clientWidth !== overflow.scrollWidth
    if (overflowed !== this.overflowed) {
      this.overflowed = overflowed
      if (overflowed) {
        th.className += ' ' + this.overflowClass
      } else {
        th.className = th.className.replace(this.overflowClass, '')
      }
    }
  })

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
    let filter = this.props.filter
    let sort = this.props.sort
    let titleClass = classNames('filter-title', filter.name, {
      sort: sort != null,
      'sort-asc': sort === true,
      'sort-desc': sort === false,
      'filter-title-active': this.props.active,
      [this.overflowClass]: this.overflowed,
      sortable: !!this.props.filter.sort
    })
    let width = this.props.width

    return (
      <th style={{width: width}}
        ref='th'
        className={titleClass}>
        <div className='title-overflow' ref='overflow' onClick={::this.onSort}>
          {filter.title}
        </div>
        <div className='title-icon' onClick={::this.onSort}>
          <i className={'fa icon-' + filter.name}></i>
        </div>
        <div className='title-tooltip'>
          <span>{filter.title}</span>
        </div>
        { this.props.active ? (
          <DataTableTitleFilterButtons
            mode={this.props.highlightMode}
            onSetHighlightMode={this.props.onSetHighlightMode}
            onClearFilter={this.props.onClearFilter}/>
        ) : null}

        <div className='title-highlight-border'></div>
        <ColumnResizeHandle
          onStop={::this.onResize}
          onDoubleClick={::this.onResetResize}/>
      </th>
    )
  }
}
