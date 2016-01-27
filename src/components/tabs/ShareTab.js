import { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import * as urlificator from 'lib/urlificator'

@connect((state) => ({
  toggledFilters: state.toggledFilters,
  query: state.query,
}))
export default class ShareTab extends Component {
  componentWillMount () {
    console.log(this.props)
    this.props.params
  }

  render () {
    let encodedState = urlificator.encode(this.props)
    let url = `${location.origin}/filter/${encodedState}`

    return (
      <div className='sharer'>
        <input value={url} className='sharer-url' readOnly={true}/>
      </div>
    )
  }
}
