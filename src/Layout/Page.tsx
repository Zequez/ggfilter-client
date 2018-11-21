import * as React from 'react';
import * as th from './Layout.sass';
import * as cx from 'classnames';

interface PageProps {
  className?: string;
  title?: string;
  children: any;
}

export default class Page extends React.Component<PageProps> {
  render () {
    let { children, className } = this.props;
    return (
      <main className={cx(th.Layout__Page, className)}>
        {children}
      </main>
    );
  }
}
