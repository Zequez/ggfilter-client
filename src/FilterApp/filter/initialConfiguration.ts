import definitions, { FiltersNames } from '../../Definitions';
import { FiltersConfiguration, FilterConfig, PartialFilterConfig } from './stateTypes';

const initialConfigurationValues: {[key in FiltersNames]?: PartialFilterConfig} = {
  Name: { column: true },
  Tags: { column: true },
  RelativeReleaseDate: { column: true, sort: true },
  BestDiscount: { query: {gt: 1, lt: null} },
  // PlaytimeMedian: true,
  LowestPrice: { column: true },
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
