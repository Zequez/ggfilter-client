import React, { PropTypes as t, Component } from 'react'
import { AutoPage } from 'src/Layout'
import FilterApp from './FilterApp'

export default class FilterAppPage extends Component {
  render () {
    return (
      <AutoPage title='Filter'>
        <FilterApp/>
      </AutoPage>
    )
  }
}
