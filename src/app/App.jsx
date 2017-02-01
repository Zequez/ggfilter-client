import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { Lightbox } from 'src/Lightbox'
import Layout from 'src/Layout'
import * as pages from './pages'
import pageSelector from './pageSelector'

@connect(
  (s) => ({ page: pageSelector(s) })
)
export default class App extends Component {
  static propTypes = {
    page: t.string.isRequired
  }

  render () {
    const { page } = this.props
    const CurrentPage = pages[page]

    return (
      <Layout>
        <CurrentPage/>
        <Lightbox/>
      </Layout>
    )
  }
}

if (module.hot) {
  module.hot.accept()
}
