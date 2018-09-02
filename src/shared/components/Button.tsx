import * as React from 'react';
import * as th from './Button.sass';
import * as cx from 'classnames';

import Ripple from './Ripple';
import Icon from './Icon';

interface ButtonProps {
  label?: string;
  children?: any;
  className?: string;
  raised?: boolean;
  primary?: boolean;
  alt?: boolean;
  icon?: string;
  disabled?: boolean;
  flat?: boolean;
  onClick?: (event: React.SyntheticEvent<EventTarget>) => void;
}

class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    raised: true,
    primary: true,
    alt: false
  };

  onClick = (ev: React.SyntheticEvent<EventTarget>) => {
    this.refs.button['blur']();
    if (this.props.onClick) this.props.onClick(ev);
  }

  render () {
    let { children, icon, label, flat, raised, primary, alt, disabled, className, ...other } = this.props;

    if (flat) raised = false;

    return (
      <button ref='button' className={cx(th.Button, className, {
        [th.Button_raised]: raised,
        [th.Button_flat]: !raised,
        [th.Button_primary]: primary,
        [th.Button_disabled]: disabled,
        [th.Button_alt]: alt
      })} disabled={disabled} {...other} onClick={this.onClick} >
        { icon ? <Icon icon={icon}/> : null }
        {label}
        {children}
      </button>
    );
  }
}

export default Ripple()(Button) as any as typeof Button;
