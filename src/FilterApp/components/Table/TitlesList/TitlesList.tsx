import * as React from 'react';
import * as th from './TitlesList.sass';

import { FiltersConfiguration } from '../../../filter/initialState';
import definitions, { FiltersNames }  from '../../../../Definitions';

import Title from './Title';

type TitlesListProps = {
  configuration: FiltersConfiguration;
  setSort: (filter: FiltersNames, direction: boolean) => void;
};

export default class TitlesList extends React.Component<TitlesListProps> {
  // shouldComponentUpdate (np, ns) {
  //   let p = this.props
  //   return (
  //     np.columns !== p.columns ||
  //     np.columnsParams !== p.columnsParams ||
  //     np.sorting.column !== p.sorting.column ||
  //     np.sorting.direction !== p.sorting.direction
  //   )
  // }

  onSort = (filter: FiltersNames) => {
    this.props.setSort(filter, !this.props.configuration[filter].sort);
  }

  render () {
    // console.logRender('DataTableTitles')
    let { configuration } = this.props;

    let titles = [];

    for (let filterName in configuration) {
      let config = configuration[filterName as FiltersNames];
      if (config.column) {
        let filter = definitions.filters.get(filterName as FiltersNames);
        titles.push (
          <Title
            key={filterName}
            filter={filter}
            config={config}
            onSort={() => this.onSort(filterName as FiltersNames)}/>
        );
      }
    }

    return (
      <tr className={th.TitlesList}>
        {titles}
      </tr>
    );
  }
}
