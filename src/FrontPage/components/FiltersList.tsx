import * as React from 'react';
import * as th from './FrontPage.sass';
import { types } from 'src/FilterApp';
import FilterCard from './FilterCard';

interface FiltersListProps {
  title: string;
  filters: types.HyperFilter[];
}

export default class FiltersList extends React.Component<FiltersListProps, null> {
  render () {
    return (
      <div className={th.FiltersList}>
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.filters.map((filter) =>
            <FilterCard key={filter.sid} filter={filter}/>
          )}
        </ul>
        <div className={th.seeAllOfEm}>
          <a href='#'>Showing 6 out of 60 filters in this list...</a>
        </div>
      </div>
    );
  }
}
