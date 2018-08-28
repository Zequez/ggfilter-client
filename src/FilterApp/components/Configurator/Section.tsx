import * as React from 'react';
import * as th from './Configurator.sass';

interface SectionProps {
  title: string;
  children: JSX.Element[] | JSX.Element | String;
}

export default class Section extends React.Component<SectionProps, any> {
  render () {
    return (
      <div className={th.__Section}>
        <h2 className={th.__Title}>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}
