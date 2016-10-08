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

  render () {
    let { dirty, onSubmit, url } = this.props

    return (
      <div className='sfilter-form-simple'>
        <div className='form-input'>
          <input
            type='text'
            value={url}
            onClick={this.selectAll}
            readOnly={true}/>
          <button className='btn form-btn' onClick={onSubmit} disabled={!dirty}>
            Shorten
          </button>
        </div>
      </div>
    )
  }
}
