import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'
import { setParam } from '../reducer'

import ControlComponent from './ControlComponent'

@connect((s) => ({}), {
  setParam
})
export default class DataTableControls extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object.isRequired,

    setParam: t.func.isRequired
  }

  render () {
    console.logRender('DataTableControls')
    let { filters, filtersParams, setParam } = this.props

    return (
      <tr className='data-table-controls'>
        {filters.map((filter) => (
          <ControlComponent
            key={filter.name}
            filter={filter}
            params={filtersParams[filter.name]}
            onChange={partial(setParam, filter.name)}/>
        ))}
      </tr>
    )
  }
}
