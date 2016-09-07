import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import * as urlificator from 'lib/urlificator'

@connect((state) => ({
  toggledFilters: state.toggledFilters,
  query: state.query,
}))
export default class ShareTab extends Component {
  componentWillMount () {
    this.props.params
  }

  selectAll (ev) {
    ev.target.select()
  }

  render () {
    // let encodedState = urlificator.encode(this.props)
    // let url = `${location.origin}/filter/${encodedState}`
    let url = '#'

    return (
      <div className='sharer'>
        <input value={url} onClick={this.selectAll} className='sharer-url' readOnly={true}/>
      </div>
    )
  }
}
