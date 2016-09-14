import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { encode } from 'lib/b64FilterGenerator'
import router from 'sources/stateRoutes'
import config from 'sources/config'
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
    let path = ''
    switch (this.props.filterUrlType) {
      case URLS_TYPES.b64: path = router.urlGen('filterB64', encode(this.props.filter))
        break
      case URLS_TYPES.sid: path = router.url('filterSid', this.props.sid)
        break
      // case URLS_TYPES.official: return ''
    }
    return config.origin + path
  }

  render () {
    let url = this.appropiateFilterPath()

    return (
      <div className='sharer'>
        <input value={url} onClick={this.selectAll} className='sharer-url' readOnly={true}/>
        <button className='btn sharer-shorten' onClick={::this.shorten}>Shorten</button>
      </div>
    )
  }
}
