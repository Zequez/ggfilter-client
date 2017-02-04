import th from './ControlsList.sass'
import React, { Component, PropTypes as t } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils'

import { setParam, clearParam } from '../../../filter/reducer'
import { definedControlsList, controlsParams, controlsHlMode } from '../../../filter/selectors'

import ControlButton from './ControlButton'

@connect((s) => ({
  controls: definedControlsList(s),
  controlsParams: controlsParams(s),
  controlsHlMode: controlsHlMode(s)
}), {
  setParam,
  clearParam
})
export default class ControlsList extends Component {
  static propTypes = {
    controls: t.arrayOf(t.object).isRequired,
    controlsParams: t.object.isRequired,

    setParam: t.func.isRequired
  }

  render () {
    let { controls, controlsParams, controlsHlMode, setParam, clearParam } = this.props

    return (
      <tr className={th.ControlsList}>
        {controls.map((control) => (
          <th className={th.ControlsList__cell} key={control.name}>
            <div className={th.ControlList__cellWrap}>
              <ControlButton
                control={control}
                hl={!!~controlsHlMode.indexOf(control.name)}
                query={controlsParams[control.name]}
                onRemove={partial(clearParam, control.name)}
                onChange={partial(setParam, control.name)}/>
            </div>
          </th>
        ))}
      </tr>
    )
  }
}
