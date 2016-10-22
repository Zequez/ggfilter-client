import React, { Component, PropTypes as t } from 'react'
import classNames from 'classnames'

import ColumnResizeHandle from './ColumnResizeHandle'
import DataTableTitleFilterButtons from './DataTableTitleFilterButtons'

export default class DataTableTitle extends Component {
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
      np.highlightMode !== p.highlightMode
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
    let filter = this.props.filter
    let sort = this.props.sort
    let titleClass = classNames('filter-title', filter.name, {
      sort: sort != null,
      'sort-asc': sort === true,
      'sort-desc': sort === false,
      'filter-title-active': this.props.active,
      sortable: !!this.props.filter.sort
    })

    return (
      <th
        ref='th'
        className={titleClass}
        onClick={::this.onSort}>
        <div className='title-icon'>
          <i className={'fa icon-' + filter.name}></i>
        </div>
        <div className='title-tooltip'>
          {filter.title}
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
