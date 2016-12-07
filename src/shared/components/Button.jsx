import th from './Button.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

import Ripple from './Ripple'
import Icon from './Icon'

class Button extends Component {
  static propTypes = {
    children: t.node,
    className: t.string,
    raised: t.bool,
    primary: t.bool,
    accent: t.bool,
    label: t.string,
    icon: t.string
  }

  static defaultProps = {
    raised: true,
    primary: true,
    accent: true
  }

  onClick = (ev) => {
    this.refs.button.blur()
    if (this.props.onClick) this.props.onClick(ev)
  }

  render () {
    let { children, icon, label, flat, raised, primary, accent, disabled, className, ...other } = this.props

    if (flat) raised = false

    return (
      <button ref='button' className={cx(th.Button, className, {
        [th.Button_raised]: raised,
        [th.Button_flat]: !raised,
        [th.Button_primary]: primary,
        [th.Button_accent]: accent,
        [th.Button_disabled]: disabled
      })} disabled={disabled} {...other} onClick={this.onClick} >
        { icon ? <Icon icon={icon}/> : null }
        {label}
        {children}
      </button>
    )
  }
}

export default Ripple()(Button)
