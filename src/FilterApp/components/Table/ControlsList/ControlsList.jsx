import th from './ControlsList.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'
import { setParam, clearParam } from '../../../filter/reducer'

import ControlButton from './ControlButton'

@connect((s) => ({}), {
  setParam,
  clearParam
})
export default class ControlsList extends Component {
  static propTypes = {
    filters: t.arrayOf(t.object).isRequired,
    filtersParams: t.object.isRequired,

    setParam: t.func.isRequired
  }

  render () {
    let { filters, filtersParams, setParam, clearParam } = this.props

    return (
      <tr className={th.ControlsList}>
        {filters.map((filter) => (
          <th className={th.ControlsList__cell} key={filter.name}>
            <div className={th.ControlList__cellWrap}>
              <ControlButton
                filter={filter}
                query={filtersParams[filter.name]}
                onRemove={partial(clearParam, filter.name)}
                onChange={partial(setParam, filter.name)}/>
            </div>
          </th>
        ))}
      </tr>
    )
  }
}
