import * as React from 'react';
import * as cx from 'classnames';
import * as th from './Control.sass';

interface ToggleIconProps {
  value: boolean;
  active?: boolean;
  onToggle: (value: boolean) => void;
  icon: string;
  iff?: boolean;
}

export default class ToggleIcon extends React.Component<ToggleIconProps, null> {
  render () {
    let { value, onToggle, icon, iff, active } = this.props;
    active = active === undefined ? value : active;
    return (iff === undefined || iff) ? (
      <i className={cx('fa', th[`Icon${icon}`], { [th._active]: active })}
         onClick={() => onToggle(!value)}
      />
    ) : null;
  }
}
