import definitions, { FiltersNames } from '../../Definitions';
import { FiltersConfiguration, FilterConfig, PartialFilterConfig } from './stateTypes';

const initialConfigurationValues: {[key in FiltersNames]?: PartialFilterConfig} = {
  Name: { column: true },
  Tags: { column: true },
  ReleaseDate: { column: true, sort: true },
  // BestDiscount: { query: {gt: 1, lt: null} },
  RatingsCount: { query: { gte: 70, lt: 100 } },
  Playtime: { column: true },
  LowestPrice: { column: true },
  RatingsRatio: { column: true }
  // RatingsPct: { column: true }
};

const filterConf: FilterConfig = {
  query: null,
  hl: false,
  column: false,
  sort: null,
  fineTuned: false
};

let configuration = {};

definitions.sortedFiltersNames.forEach((filterName) => {
  configuration[filterName] = Object.assign(
    {},
    filterConf,
    initialConfigurationValues[filterName] || {}
  );
});

export default <FiltersConfiguration> configuration;
