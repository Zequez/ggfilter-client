import * as React from 'react';
import * as th from './Layout.sass';
import * as cx from 'classnames';

import MenuButton from './MenuButton';

interface AppBarProps {
  children: any;
  className: string;
}

export default class AppBar extends React.Component<AppBarProps> {
  render () {
    let { children, className } = this.props;

    return (
      <header className={cx(th.Layout__AppBar, className)}>
        <MenuButton/>
        {children}
      </header>
    );
  }
}
