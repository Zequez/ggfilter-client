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
  mini?: boolean;
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    raised: true,
    primary: true,
    alt: false,
    mini: false
  };

  onClick = (ev: React.MouseEvent<HTMLElement>) => {
    this.refs.button['blur']();
    if (this.props.onClick) this.props.onClick(ev);
  }

  render () {
    let { children, icon, label, flat, raised, primary, mini, alt, disabled, link, className, ...other } = this.props;

    if (flat) raised = false;

    let Elem = link ? 'a' : 'button';

    return (
      <Elem ref='button' href={link} className={cx(th.Button, className, {
        [th.Button_raised]: raised,
        [th.Button_flat]: !raised,
        [th.Button_primary]: primary,
        [th.Button_secondary]: !primary,
        [th.Button_mini]: mini,
        [th.Button_disabled]: disabled,
        [th.Button_alt]: alt
      })} disabled={disabled} {...other} onClick={this.onClick} >
        { icon ? <Icon icon={icon}/> : null }
        {label}
        {children}
      </Elem>
    );
  }
}

export default Ripple()(Button) as any as typeof Button;
