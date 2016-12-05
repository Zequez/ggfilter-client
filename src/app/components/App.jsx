import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import * as pages from '../pages'
// import { Lightbox } from 'src/Lightbox'
import Layout from 'src/Layout'

@connect(
  (s) => ({ mode: s.ui.mode })
)
export default class App extends Component {
  static propTypes = {
    mode: t.string.isRequired
  }

  render () {
    const { mode } = this.props
    const CurrentPage = pages[mode]

    return (
      <Layout>
        <CurrentPage/>
      </Layout>
    )
  }
}

if (module.hot) {
  module.hot.accept()
}
