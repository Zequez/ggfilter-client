import th from './Control.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import { isQueryEmpty } from '../../lib/utils'

export default class ControlComponent extends Component {
  static propTypes = {
    filter: t.object,
    query: t.oneOfType([t.object, t.bool]),
    onChange: t.func
  }

  focus () {
    if (this.refs.control.focus) this.refs.control.focus()
  }

  render () {
    const {filter, query, onChange} = this.props

    const props = {
      query: isQueryEmpty(query) ? undefined : query,
      name: filter.name,
      options: filter.controlOptions,
      onChange: (value) => onChange(value === null ? true : value)
    }

    let Component = filter.control

    return (
      <div className={cx(th.Control, filter.name)}>
        <div className={th.Control__overflow}>
          <Component {...props} ref='control'/>
        </div>
      </div>
    )
  }
}
