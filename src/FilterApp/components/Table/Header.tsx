import * as React from 'react';
import * as th from './Table.sass';

import { FiltersConfiguration } from '../../filter';
import { FiltersNames } from '../../../Definitions';

// import ColumnsWidthFixator from './ColumnsWidthFixator';
import ControlsList from './ControlsList';
import TitlesList from './TitlesList';

type HeaderProps = {
  configuration: FiltersConfiguration;
  setSort: (filter: FiltersNames, sort: boolean) => void;
};

export default class Header extends React.Component<HeaderProps> {
  render () {
    return (
      <thead className={th.Table__Header}>
        {/* <ColumnsWidthFixator columns={columns}/> */}
        <TitlesList
          configuration={this.props.configuration}
          setSort={this.props.setSort}/>
      </thead>
    );
  }
}
