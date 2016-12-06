import th from './ControlsList.sass'
import React, { PropTypes as t, Component } from 'react'
import cn from 'classnames'
import * as controlsDefinitions from '../controls'

export default class ControlComponent extends Component {
  static propTypes = {
    filter: t.object,
    params: t.oneOfType([t.object, t.bool]),
    onChange: t.func
  }

  focus () {
    if (this.refs.control.focus) this.refs.control.focus()
  }

  render () {
    const {filter, params, onChange} = this.props

    const controlClass = cn(
      filter.name,
      th.ControlsList__ControlComponent
      // th['control-' + filter.control]
    )

    const props = {
      query: (params === true || params === false) ? undefined : params,
      name: filter.name,
      options: filter.controlOptions,
      onChange: (value) => onChange(value === null ? true : value)
    }

    let Component = controlsDefinitions[filter.control]

    return (
      <div className={controlClass}>
        <div className={th.ControlsList__controlOverflow}>
          <Component {...props} ref='control'/>
        </div>
      </div>
    )
  }
}
