import * as React from 'react';
const th = require('./FiltersCategory.sass');

interface Props {
  title: String;
}

export default class FiltersCategory extends React.Component<Props, null> {
  render () {
    return (
      <div className={th.FiltersCategory}>
        <h2 className={th.__Title}>{this.props.title}</h2>
        <input type='text' placeholder='Filterrr...'/>
      </div>
    );
  }
}
