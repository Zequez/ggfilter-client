import * as React from 'react';
import * as th from './Table.sass';

import { FiltersConfiguration } from '../../filter/initialState';
import { FiltersNames } from '../../../Definitions';

import Header from './Header';
// import Body from './Body';

type TableProps = {
  gamesPages: object[][];
  configuration: FiltersConfiguration;
  setSort: (filter: FiltersNames, sort: boolean) => void;
};

export default class Table extends React.Component<TableProps> {
  render () {
    let { configuration, gamesPages } = this.props;

    // Object.entries(configuration).forEach(())

    // let columns = Object.values(configuration).filter((filterConf) => filterConf.column);


    return (
      <div className={th.Table}>
        <table className={th.Table__table}>
          <Header
            setSort={this.props.setSort}
            configuration={configuration}/>
          {/* {Body({gamesPages, configuration})} */}
        </table>
      </div>
    );
  }
}
