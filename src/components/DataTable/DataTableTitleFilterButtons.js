import React, { PropTypes as t, Component } from 'react'

export default class DataTableTitleFilterButtons extends Component {
  static propTypes = {
    mode: t.bool.isRequired,
    onSetHighlightMode: t.func.isRequired,
    onClearFilter: t.func.isRequired
  }

  setHighlightMode (mode) {
    if (this.props.mode !== mode) {
      this.props.onSetHighlightMode(mode)
    }
  }

  render () {
    let filterActive = this.props.mode ? '' : ' active'
    let highlightActive = this.props.mode ? ' active' : ''

    return (
      <div className='filter-title-buttons'>
        <button
          className={'filter-title-button-filter' + filterActive}
          onClick={this.setHighlightMode.bind(this, false)}>
          <i className='fa icon-filter'></i>
        </button>
        <button
          className={'filter-title-button-highlight' + highlightActive}
          onClick={this.setHighlightMode.bind(this, true)}>
          <i className='fa icon-highlight'></i>
        </button>
        <button
          className='filter-title-button-clear'
          onClick={this.props.onClearFilter}>
          <i className='fa icon-close'></i>
        </button>
      </div>
    )
  }
}
