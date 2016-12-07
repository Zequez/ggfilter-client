import React, { PropTypes as t, Component } from 'react'
import { Page } from 'src/Layout'
import FilterApp from './FilterApp'

export default class FilterAppPage extends Component {
  render () {
    return (
      <Page title='Filter'>
        <FilterApp/>
      </Page>
    )
  }
}
