import * as React from 'react';
import * as cx from 'classnames';
import * as th from './Configurator.sass';
import Section from './Section';
import Control from './Control/Control';
import { FiltersConfiguration } from '../../filter';

import definitions, { Category, Filter, FiltersNames } from '../../../Definitions';

interface ConfiguratorProps {
  configuration: FiltersConfiguration;
  onQueryChange: (filter: FiltersNames, query: object) => void;
  onColumnChange: (filter: FiltersNames, column: boolean) => void;
  onHlChange: (filter: FiltersNames, hl: boolean) => void;
}

export default class Configurator extends React.Component<ConfiguratorProps> {
  categoryControlFilters (category: Category) {
    return category.filters.filter((filterName) =>
      !!definitions.filters.get(filterName).control
    ).map((filterName) => definitions.filters.get(filterName));
  }

  categoryColumnOnlyFilters (category: Category) {
    return category.filters.filter((filterName) =>
      !definitions.filters.get(filterName).control
    ).map((filterName) => definitions.filters.get(filterName));
  }

  control (filter: Filter) {
    return <Control
      key={filter.name}
      config={this.props.configuration[filter.name]}
      filter={filter}
      onQueryChange={(query) => this.props.onQueryChange(filter.name, query)}
      onColumnChange={(column) => this.props.onColumnChange(filter.name, column)}
      onHlChange={(hl) => this.props.onHlChange(filter.name, hl)}/>;
  }

  render () {
    let { configuration } = this.props;

    return <div className={th.Configurator}>
      {definitions.categoriesList.map((category) =>
        <Section title={category.title} key={category.name}>
          {this.categoryControlFilters(category).map((filter) => this.control(filter))}
          {/* <hr/> */}
          {this.categoryColumnOnlyFilters(category).map((filter) => this.control(filter))}
        </Section>
      )}
    </div>;
  }
}
