import th from './ControlsList.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'
import { setParam } from '../../../filter/reducer'

import ControlButton from './ControlButton'

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
    let { filters, filtersParams, setParam } = this.props

    return (
      <tr className={th.ControlsList}>
        {filters.map((filter) => (
          <th className={th.ControlsList__cell} key={filter.name}>
            <ControlButton
              filter={filter}
              query={filtersParams[filter.name]}
              onChange={partial(setParam, filter.name)}/>
          </th>
        ))}
      </tr>
    )
  }
}
