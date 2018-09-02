import * as React from 'react';
import * as th from './Table.sass';

import { FiltersConfiguration, Game } from '../../filter';
import { FiltersNames } from '../../../Definitions';

import Header from './Header';
import Body from './Body';

type TableProps = {
  gamesPages: Game[][];
  configuration: FiltersConfiguration;
  setSort: (filter: FiltersNames, sort: boolean) => void;
  setQuery: (filter: FiltersNames, query: {}) => void;
  setLightbox: (images: string[], thumbnails: string[]) => void;
};

export default class Table extends React.Component<TableProps> {
  render () {
    let { configuration, gamesPages, setSort, setQuery, setLightbox } = this.props;

    return (
      <div className={th.Table}>
        <table className={th.Table__table}>
          <Header
            setSort={setSort}
            configuration={configuration}/>
          {Body({gamesPages, configuration, setQuery, setLightbox})}
        </table>
      </div>
    );
  }
}
