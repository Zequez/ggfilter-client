import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { navigateToFilterUrl } from 'stores/reducers/filterUrlReducer'

// Alright, this is pretty hacky, but we have a problem
// We don't want the URL of the filter to be the source of truth, we already
// have a state for that!
// When we receive an update of the filter on this component
// it means we are on the filter route, AND we need to update the URL
// so we'll do just that.
// And hopefully we won't trigger and infinite loop.

@connect((s) => ({filter: s.filter}), { navigateToFilterUrl })
export default class FilterTab extends Component {
  static propTypes = {
    filter: t.object.isRequired,
    navigateToFilterUrl: t.func.isRequired
  }

  shouldComponentUpdate (np) {
    let tp = this.props
    return np.filter !== tp.filter
  }

  componentWillUpdate () {
    this.props.navigateToFilterUrl()
  }

  render () {
    return null
  }
}
