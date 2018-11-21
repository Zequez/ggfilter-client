import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { sfilter as sfilterSel } from '../filter/selectors'

@connect((s) => ({
  sfilter: sfilterSel(s)
}), {
  navigateTo: actions.navigateTo
})
export default class RedirectToCurrentFilter extends React.Component {
  componentWillMount () {
    let { sfilter, navigateTo } = this.props
    if (sfilter && sfilter.sid && sfilter.nameSlug) {
      navigateTo('filterFull', {sid: sfilter.sid, slug: sfilter.nameSlug})
    } else {
      navigateTo('root')
    }
  }

  render () {
    return (
      null
    )
  }
}
