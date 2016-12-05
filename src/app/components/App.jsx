import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'

const { resetFilter } = require('src/FilterApp').actions
import { resetUi } from 'shared/reducers/uiReducer'

// import { Lightbox } from 'src/Lightbox'
// import TabsContainer from './Tabs/TabsContainer'
import Layout from './Layout/index'

// import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout'
// import { Button } from 'react-toolbox/lib/button'
// import Tabs from './Tabs/Tabs'

@connect(
  (s) => ({
    mode: s.ui.mode
  }),
  { resetFilter, resetUi }
)
export default class App extends Component {
  static propTypes = {
    mode: t.string.isRequired,
    resetFilter: t.func.isRequired,
    resetUi: t.func.isRequired
    // The store on initialState
  }

  // state = {
  //   drawerActive: false
  // }

  // clickOnLogo = () => {
  //   this.props.resetFilter()
  //   this.props.resetUi()
  // }

  // toggleDrawerActive = () => {
  //   this.setState({drawerActive: !this.state.drawerActive})
  // }

  render () {
    // let { drawerActive } = this.state
    let { mode } = this.props

    return (
      <Layout mode={mode}>

        {/*<NavDrawer
          active={drawerActive}
          onOverlayClick={this.toggleDrawerActive}>
          <p>
              Hello fella!
          </p>
        </NavDrawer>
        <Panel>
          <Button label='Panel' onClick={this.toggleDrawerActive}/>
        </Panel>*/}
        {/*<TabsContainer/>
        <Lightbox/>*/}
      </Layout>
    )
  }
}

if (module.hot) {
  module.hot.accept()
}
