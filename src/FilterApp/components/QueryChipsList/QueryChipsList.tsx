import * as React from 'react';
import * as th from './QueryChipsList.sass';
import definitions, { FiltersNames } from '../../../Definitions';
import { FiltersConfiguration } from '../../filter';
import QueryChip from '../QueryChip';
import SortQueryChip from '../QueryChip/SortQueryChip';

interface QueryChipsListProps {
  configuration: FiltersConfiguration;
  onRemove?: (filter: FiltersNames) => void;
}

export default class QueryChipsList extends React.Component<QueryChipsListProps> {
  render () {
    let { configuration, onRemove } = this.props;

    let sortChip: JSX.Element = null;
    let chips = [];
    for (let a in configuration) {
      let filterName = a as FiltersNames;
      let config = configuration[filterName];
      if (config.query) {
        chips.push(
          <div key={filterName} className={th.QueryChipsList__chipContainer}>
            <QueryChip
              config={config}
              filter={definitions.filters.get(filterName)}
              onRemove={this.props.onRemove ? () => this.props.onRemove(filterName) : null}/>
          </div>
        );
      }
      if (config.sort != null) {
        let filter = definitions.filters.get(filterName);
        sortChip = <div className={th.QueryChipsList__chipContainer}>
          <SortQueryChip title={filter.title} asc={config.sort}/>
        </div>;
      }
    }

    return chips.length ? (
      <div className={th.QueryChipsList}>
        {onRemove ? <div className={th.QueryChipsList__titleLabel}>
          Filters
        </div> : null}
        {chips}
        {sortChip}
      </div>
    ) : null;
  }
}
