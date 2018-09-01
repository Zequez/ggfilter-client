import * as React from 'react';
import * as th from './QueryChipsList.sass';
import definitions, { FiltersNames } from '../../../Definitions';
import { FiltersConfiguration } from '../../filter';
import QueryChip from '../QueryChip';

interface QueryChipsListProps {
  configuration: FiltersConfiguration;
  onRemove: (filter: FiltersNames) => void;
}

export default class QueryChipsList extends React.Component<QueryChipsListProps> {
  render () {
    let { configuration } = this.props;

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
              onRemove={() => this.props.onRemove(filterName)}/>
          </div>
        );
      }
    }

    return chips.length ? (
      <div className={th.QueryChipsList}>
        <div className={th.QueryChipsList__titleLabel}>
          Filters
        </div>
        {chips}
      </div>
    ) : null;
  }
}
