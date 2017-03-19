import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Lightbox } from 'src/Lightbox'
import Layout, { Drawer, DrawerItem } from 'src/Layout'

import {
  FilterAppPage,
  RedirectToCurrentFilter
} from 'src/FilterApp'
import { SysreqCalc } from 'src/SysreqCalc'
import * as staticPage from '../StaticPages'

const routesMap = {
  root: () => <FilterAppPage/>,
  filterSid: ({sid}) => <FilterAppPage sid={sid}/>,
  filterFull: ({sid, slug}) => <FilterAppPage sid={sid} slug={slug}/>,
  filterRedirect: () => <RedirectToCurrentFilter/>,
  sysreq: () => <SysreqCalc/>,

  aboutSysreq: () => <staticPage.aboutSysreq/>,
  logs: () => <staticPage.logs/>,
  sources: () => <staticPage.sources/>,
  feedback: () => <staticPage.feedback/>,
  donations: () => <staticPage.contribute/>
}

type Props = {
  route: {
    name: String,
    params: Object,
    path: String
  }
}

@connect((s) => ({
  ...routeNodeSelector('')(s)
}))
export default class App extends React.Component {
  props: Props

  render () {
    let { route } = this.props
    return (
      <Layout>
        <Drawer headerTo='root'>
          <DrawerItem to='filterRedirect' label='Filter' icon='filter'/>
          <DrawerItem to='sysreq' label="Sys. Req. Calculator" icon='sysreq'/>
          <DrawerItem to='feedback' label="Feedback" icon='feedback'/>
          <DrawerItem to='donations' label="Donations" icon='contribute'/>
          <DrawerItem to='http://zequez.com/about-me/' target='_blank' label="Author" icon='about'/>
        </Drawer>

        {routesMap[route.name](route.params)}
        <Lightbox/>
      </Layout>
    )
  }
}

if (module.hot) {
  module.hot.accept()
}
