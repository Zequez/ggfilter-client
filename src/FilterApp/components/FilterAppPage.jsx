import React, { PropTypes as t, Component } from 'react'
import Page from 'src/app/components/Tabs/Page'
import FilterApp from './FilterApp'

export default class FilterAppPage extends Component {
  render () {
    return (
      <Page Title='Filter' {...this.props}>
        <FilterApp/>
      </Page>
    )
  }
}
