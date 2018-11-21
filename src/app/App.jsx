import React from 'react'

import { Lightbox } from 'src/Lightbox';
import Layout, { Drawer, DrawerItem } from 'src/Layout';

import Pages from './Pages';

export default class App extends React.Component {
  // static propTypes = {
  //   route: React.PropTypes.shape({
  //     name: React.PropTypes.string,
  //     params: React.PropTypes.object,
  //     path: React.PropTypes.string
  //   })
  // }

  render () {
    return (
      <Layout>
        <Drawer headerTo='root'>
          <DrawerItem to='filterRedirect' label='Filter' icon='filter'/>
          <DrawerItem to='sysreq' label="Sys. Req. Calculator" icon='sysreq'/>
          <DrawerItem to='feedback' label="Feedback" icon='feedback'/>
          <DrawerItem to='donations' label="Donations" icon='contribute'/>
          <DrawerItem to='http://zequez.com/about-me/' target='_blank' label="Author" icon='about'/>
        </Drawer>
        <Pages/>
        <Lightbox/>
      </Layout>
    )
  }
}

if (module.hot) {
  module.hot.accept()
}
