import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { Page } from 'src/Layout'
import { sfilter as sfilterSelector } from '../filter/selectors'
import { showSfilter, loadFrontPageFilters } from '../filter/actions'
import FilterApp from './FilterApp'

@connect((s) => ({
  sfilter: sfilterSelector(s)
}), {
  showSfilter,
  loadFrontPageFilters,
  navigateTo: actions.navigateTo
})
export default class FilterAppPage extends React.Component {
  propTypes: {
    sid: React.PropTypes.string,
    slug: React.PropTypes.string,
    showSfilter: React.PropTypes.func,
    loadFrontPageFilters: React.PropTypes.func,
    loadFrontPageFilters: React.PropTypes.func,
    sfilter: React.PropTypes.object,
    navigateTo: React.PropTypes.func
  }

  componentWillMount () {
    this.loadSfilter(this.props)
  }

  shouldComponentUpdate (np) {
    let tp = this.props
    return (
      np.sid !== tp.sid || np.slug !== tp.slug
    )
  }

  componentWillUpdate (props) {
    this.loadSfilter(props)
  }

  componentWillReceiveProps (props) {
    let { sid, slug, sfilter, navigateTo } = props
    if (sid && !slug && sfilter && sfilter.nameSlug) {
      navigateTo('filterFull', {sid: sfilter.sid, slug: sfilter.nameSlug})
    }
  }

  loadSfilter ({sid, slug, sfilter}) {
    if (sid && (!sfilter || sfilter.sid !== sid)) {
      this.props.showSfilter(sid)
    } else if (!sid && (!sfilter || sfilter.frontPage !== 0)) {
      this.props.loadFrontPageFilters()
    }
  }

  render () {
    return (
      <Page title='Filter'>
        <FilterApp/>
      </Page>
    )
  }
}
