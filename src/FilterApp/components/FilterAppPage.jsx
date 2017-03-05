import React from 'react'
import { connect } from 'react-redux'
import { Page } from 'src/Layout'
import { sfilter as sfilterSelector } from '../filter/selectors'
import { showSfilter } from '../filter/actions'
import FilterApp from './FilterApp'

@connect((s) => ({
  sfilter: sfilterSelector(s)
}), {
  showSfilter
})
export default class FilterAppPage extends React.Component {
  propTypes: {
    sid: React.PropTypes.string,
    slug: React.PropTypes.string,
    showSfilter: React.PropTypes.func,
    loadFrontPageFilters: React.PropTypes.func,
    sfilter: React.PropTypes.object
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

  loadSfilter ({sid, slug, sfilter}) {
    if (sid && (!sfilter || sfilter.sid !== sid)) {
      this.props.showSfilter(sid)
    } else if (!sid && (!sfilter || sfilter.frontPage !== 0)) {
      this.props.showSfilter('0')
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
