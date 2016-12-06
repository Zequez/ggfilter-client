import th from './Button.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'

import Ripple from './Ripple'

class Button extends Component {
  static propTypes = {
    children: t.node,
    className: t.string,
    raised: t.bool,
    primary: t.bool,
    accent: t.bool,
    label: t.string
  }

  static defaultProps = {
    raised: true,
    primary: true,
    accent: true
  }

  render () {
    let { children, label, raised, primary, accent, disabled, className, ...other } = this.props

    return (
      <button className={cx(th.Button, className, {
        [th.Button_raised]: raised,
        [th.Button_flat]: !raised,
        [th.Button_primary]: primary,
        [th.Button_accent]: accent,
        [th.Button_disabled]: disabled
      })} disabled={disabled} {...other}>
        {label}
        {children}
      </button>
    )
  }
}

export default Ripple()(Button)
