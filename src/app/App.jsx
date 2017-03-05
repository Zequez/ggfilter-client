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

export class App extends React.Component {
  props: Props

  render () {
    let { route } = this.props

    return (
      <Layout>
        {routesMap[route.name](route.params)}
        <Lightbox/>
      </Layout>
    )

    // const { page } = this.props
    // const CurrentPage = pages[page]
    // return (
    //   <Router>
    //     <Layout>
    //       {/*<Drawer headerTo='/'>
    //         <DrawerItem icon='filter' to='/f'>Filter</DrawerItem>
    //         <DrawerItem icon='sysreq'>Sys. Req. Calculator</DrawerItem>
    //         <DrawerItem icon='feedback' to='/feedback'>Feedback</DrawerItem>
    //         <DrawerItem icon='donations' to='/donations'>Donations</DrawerItem>
    //         <DrawerItem icon='about' to='http://zequez.com/about-me/' target='_blank'>
    //           Author
    //         </DrawerItem>
    //       </Drawer>*/}
    //
    //       <Route exact path="/" render={(params) =>
    //         <FilterAppPage frontPage {...params}/>}/>
    //       <Route path="/f" component={RedirectToCurrentFilter}/>
    //       <Route path="/f/:sid(/:slug)" component={FilterAppPage}/>
    //
    //       <Route path="/sysreq" component={SysreqCalc}/>
    //       <Route path="/sysreq/about" component={staticPage.aboutSysreq}/>
    //       <Route path="/logs" component={staticPage.logs}/>
    //       <Route path="/sources" component={staticPage.sources}/>
    //       <Route path="/feedback" component={staticPage.feedback}/>
    //       <Route path="/donations" component={staticPage.contribute}/>
    //       <Route path="/oculus-sandbox" component={staticPage.oculusSandbox}/>
    //
    //       <Lightbox/>
    //     </Layout>
    //   </Router>
    // )
  }
}

export default connect((s) => ({
  ...routeNodeSelector('')(s)
}))(App)

if (module.hot) {
  module.hot.accept()
}
