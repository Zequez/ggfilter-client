import th from './ControlsList.sass'
import React, { Component, PropTypes as t } from 'react'
import { elementOffsetTop, elementOffsetLeft, onClickOutsideOnce } from 'shared/lib/utils'
import Portal from 'shared/components/Portal'
import ControlComponent from './ControlComponent'

export default class ControlPop extends Component {
  static propTypes = {
    onClose: t.func.isRequired,
    target: t.object.isRequired // Dom node
  }

  componentDidMount () {
    this.refs.control.focus()
    onClickOutsideOnce(this.refs.pop, () => {
      this.props.onClose()
    })
  }

  render () {
    const { target, ...other } = this.props

    const style = {
      top: elementOffsetTop(target),
      left: elementOffsetLeft(target)
    }

    return (
      <Portal>
        <div className={th.ControlsList__ControlPop} style={style} ref='pop'>
          <ControlComponent {...other} ref='control'/>
        </div>
      </Portal>
    )
  }
}
