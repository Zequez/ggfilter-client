import React, { PropTypes as t, Component } from 'react'

export default class SFilterFormSimple extends Component {
  static propTypes = {
    url: t.string.isRequired,
    dirty: t.bool.isRequired,
    onSubmit: t.func.isRequired
  }

  selectAll (ev) {
    ev.target.select()
  }

  copyToClipboard = (ev) => {
    this.refs.input.select()
    document.execCommand('copy')
  }

  render () {
    let { dirty, onSubmit, url } = this.props

    return (
      <div className='sfilter-form-simple'>
        <div className='form-input form-input-with-button'>
          <input
            type='text'
            value={url}
            onClick={this.selectAll}
            ref='input'
            readOnly={true}/>
          <button className='btn form-input-middle-btn' onClick={onSubmit} disabled={!dirty}>
            Shorten
          </button>
          <button className='btn' onClick={this.copyToClipboard}>
            Copy
          </button>
        </div>
      </div>
    )
  }
}
