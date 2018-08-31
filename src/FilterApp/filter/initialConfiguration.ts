import definitions, { FiltersNames } from '../../Definitions';
import { FiltersConfiguration, FilterConfig, PartialFilterConfig } from './stateTypes';

const initialConfigurationValues: {[key in FiltersNames]?: PartialFilterConfig} = {
  Name: {
    column: true,
    sort: true,
    query: { value: 'civ' }
  },
  Tags: { column: true },
  LowestPrice: { column: true }
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
