import * as React from 'react';
import * as cx from 'classnames';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  className?: string;
}

export default ({icon, className, ...other}: IconProps) => {
  return <i className={cx(className, 'fa icon-' + icon)} {...other}></i>;
};
