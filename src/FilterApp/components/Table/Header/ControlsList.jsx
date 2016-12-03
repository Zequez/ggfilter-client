import th from '../theme'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'
import { setParam } from '../../../filter/reducer'

import ControlComponent from './ControlComponent'

@connect((s) => ({}), {
  setParam
})
export default class ControlsList extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object.isRequired,

    setParam: t.func.isRequired
  }

  render () {
    console.logRender('DataTableControls')
    let { filters, filtersParams, setParam } = this.props

    return (
      <tr className={th.controlsList}>
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
