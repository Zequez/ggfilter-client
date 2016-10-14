import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { resetFilter } from 'src/FilterApp'
import { resetUi } from 'stores/reducers/uiReducer'

import { Lightbox } from 'src/Lightbox'
import TabsContainer from 'components/Tabs/TabsContainer'
import Layout from 'components/Layout'

@connect(
  (s) => ({
    routing: s.routing,
    mode: s.ui.mode,
    filterLockedInView: s.ui.filterLockedInView
  }),
  {
    resetFilter,
    resetUi
  }
)
export default class App extends Component {
  static propTypes = {
    // The store on initialState
  }

  clickOnLogo = () => {
    this.props.resetFilter()
    this.props.resetUi()
  }

  render () {
    console.logRender('App')

    let { mode, filterMode } = this.props
    let containerClassName = `mode-${mode}`

    return (
      <Layout className={containerClassName} clickOnLogo={this.clickOnLogo}>
        <TabsContainer/>
        <Lightbox/>
      </Layout>
    )
  }
}
