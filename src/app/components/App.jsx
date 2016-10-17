import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { resetFilter } from 'src/FilterApp'
import { resetUi } from 'shared/reducers/uiReducer'

import { Lightbox } from 'src/Lightbox'
import TabsContainer from './Tabs/TabsContainer'
import Layout from './Layout'

@connect(
  (s) => ({
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
    mode: t.string.isRequired,
    filterLockedInView: t.bool.isRequired,
    resetFilter: t.func.isRequired,
    resetUi: t.func.isRequired
    // The store on initialState
  }

  clickOnLogo = () => {
    this.props.resetFilter()
    this.props.resetUi()
  }

  render () {
    console.logRender('App')

    let { mode } = this.props
    let containerClassName = `mode-${mode}`

    return (
      <Layout className={containerClassName} clickOnLogo={this.clickOnLogo}>
        <TabsContainer/>
        <Lightbox/>
      </Layout>
    )
  }
}
