import definitions, { FiltersNames } from '../../Definitions';
import { FiltersConfiguration, FilterConfig, PartialFilterConfig } from './stateTypes';

export type PartialFiltersConfiguration = {[key in FiltersNames]?: PartialFilterConfig};

const initialConfigurationValues: PartialFiltersConfiguration = {
  Name: { column: true },
  Tags: { column: true },
  ReleaseDate: { column: true, sort: true },
  // Discount: { query: {gt: 1, lt: null} },
  RatingsCount: { query: { gte: 70, lt: 100 } },
  Playtime: { column: true },
  Price: { column: true },
  RatingsRatio: { column: true }
  // RatingsPct: { column: true }
};

const filterConf: FilterConfig = {
  query: null,
  hl: false,
  column: false,
  sort: null
};

export function extendConfiguration (partialConf: PartialFiltersConfiguration) {
  let configuration = {};

  definitions.sortedFiltersNames.forEach((filterName) => {
    configuration[filterName] = Object.assign(
      {},
      filterConf,
      partialConf[filterName] || {}
    );
  });

  return <FiltersConfiguration> configuration;
}

export default extendConfiguration(initialConfigurationValues);

// definitions.sortedFiltersNames.forEach((filterName) => {
//   configuration[filterName] = Object.assign(
//     {},
//     filterConf,
//     initialConfigurationValues[filterName] || {}
//   );
// });

// export default <FiltersConfiguration> configuration;
