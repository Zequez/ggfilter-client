import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

import { showLightbox } from 'stores/reducers/lightboxReducer'
import { resetFilters } from 'stores/reducers/filterReducer'
import { resetUi } from 'stores/reducers/uiReducer'

import Lightbox from 'components/utils/Lightbox'
import TabsContainer from 'components/Tabs/TabsContainer'
import Layout from 'components/Layout'

@connect(
  (s) => ({
    routing: s.routing,
    mode: s.ui.mode,
    filterMode: s.ui.filterMode,
    lightbox: s.lightbox,
    filterLockedInView: s.ui.filterLockedInView
  }),
  {
    showLightbox,
    resetFilters,
    resetUi
  }
)
export default class App extends Component {
  static propTypes = {
    // The store on initialState
  }

  onLightboxClose = () => {
    this.props.showLightbox([], [])
  }

  clickOnLogo = () => {
    this.props.resetFilters()
    this.props.resetUi()
  }

  render () {
    console.logRender('App')

    let { lightbox, mode, filterMode, filterLockedInView } = this.props
    let containerClassName = `mode-${mode} filter-mode-${filterMode}`

    return (
      <Layout className={containerClassName} clickOnLogo={this.clickOnLogo}>
        <TabsContainer/>
        <Lightbox
          media={lightbox.media}
          thumbnails={lightbox.thumbnails}
          onClose={this.onLightboxClose}/>
      </Layout>
    )
  }
}
