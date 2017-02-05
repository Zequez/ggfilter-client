import React, { PropTypes as t, Component } from 'react'
import { connect } from 'react-redux'
import { partial } from 'shared/lib/utils/func'
import ControlPop from './ControlPop'
import { setControlParams, setHlMode } from '../filter/reducer'
import { controlsParams, controlsHlMode } from '../filter/selectors'

@connect((s) => ({
  controlsParams: controlsParams(s),
  controlsHlMode: controlsHlMode(s)
}), { setControlParams, setHlMode })
export default class ControlPopContainer extends Component {
  static propTypes = {
    controlsParams: t.object.isRequired,
    controlsHlMode: t.arrayOf(t.string),
    setControlParams: t.func.isRequired,
    setHlMode: t.func.isRequired,

    control: t.object.isRequired
  }

  render () {
    let {
      controlsParams,
      controlsHlMode,
      control,
      setHlMode,
      setControlParams,
      ...other
    } = this.props
    let isHighlighted = !!~controlsHlMode.indexOf(control.name)

    return (
      <ControlPop
        control={control}
        query={controlsParams[control.name]}
        isHighlighted={isHighlighted}
        onChange={partial(setControlParams, control.name)}
        onHlChange={partial(setHlMode, control.name)}
        {...other}>
      </ControlPop>
    )
  }
}
