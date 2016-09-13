import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { encode } from 'lib/b64FilterGenerator'
import router from 'sources/stateRoutes'
import { filterUrlGenerateSid, URLS_TYPES } from 'stores/reducers/filterUrlReducer'

@connect((s) => ({
  filter: s.filter,
  filterUrlType: s.filterUrl.type,
  sid: s.filterUrl.sid
}), { filterUrlGenerateSid })
export default class ShareTab extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    filterUrlGenerateSid: t.func.isRequired
  }

  componentWillMount () {
    this.props.params
  }

  selectAll (ev) {
    ev.target.select()
  }

  shorten () {
    this.props.filterUrlGenerateSid()
  }

  appropiateFilterPath () {
    switch (this.props.filterUrlType) {
      case URLS_TYPES.b64: return router.urlGen('filterB64', encode(this.props.filter))
      case URLS_TYPES.sid: return router.url('filterSid', this.props.sid)
      case URLS_TYPES.official: return ''
    }
  }

  render () {
    let url = this.appropiateFilterPath()

    return (
      <div className='sharer'>
        <input value={url} onClick={this.selectAll} className='sharer-url' readOnly={true}/>
        <button onClick={::this.shorten}>Shorten</button>
      </div>
    )
  }
}
