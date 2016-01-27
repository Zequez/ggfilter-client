import { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { history } from 'stores/AppStore'
import { setFullQuery } from 'stores/actions'
import * as urlificator from 'lib/urlificator'

@connect()
export default class FilterTab extends Component {
  componentWillMount () {
    let stateChange = urlificator.decode(this.props.routeParams.filterName)
    if (stateChange) {
      this.props.dispatch(setFullQuery(stateChange.query))
    } else {
      history.push('/')
    }
    // Changes the state, but doesn't change the controls for some reason.
  }

  render () {
    return (
      <div></div>
    )
  }
}
