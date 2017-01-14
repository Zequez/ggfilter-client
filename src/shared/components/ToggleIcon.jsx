import th from './ToggleIcon.sass'
import React, { PropTypes as t, Component } from 'react'
import cx from 'classnames'
import Icon from './Icon'
import Ripple from './Ripple'
import TooltipFactory from './Tooltip'

const TooltipRippleButton = TooltipFactory(
  Ripple({centered: true})('button'), {position: 'top'}
)

export default class ToggleIcon extends Component {
  static propTypes = {
    checked: t.bool,
    className: t.string,
    icon: t.string
  }

  state = {
    justUnchecked: false
  }

  componentWillReceiveProps (np) {
    const justUnchecked = (this.props.checked && !np.checked)
    if (this.state.justUnchecked !== justUnchecked) {
      this.setState({justUnchecked: justUnchecked})
    }
  }

  onMouseOut = () => {
    this.setState({justUnchecked: false})
  }

  render () {
    let { checked, className, icon, ...other } = this.props

    return (
      <TooltipRippleButton
        onMouseOut={this.onMouseOut}
        rippleDisabled={checked}
        className={cx(th.ToggleIcon, className, {
          [th.ToggleIcon_checked]: checked,
          [th.ToggleIcon_justUnchecked]: this.state.justUnchecked
        })} {...other}>
        <Icon icon={icon} className={th.ToggleIcon__Icon}/>
      </TooltipRippleButton>
    )
  }
}

// export default Ripple({centered: true})(ToggleIcon)
