import { FiltersConfiguration, FilterConfig } from '../../../filter';
import definitions, { Filter } from '../../../../Definitions';

export default function extractColumns (configuration: FiltersConfiguration) {
  let columns: Filter[] = [];
  let filterName: keyof typeof configuration;
  for (filterName in configuration) {
    let filter = definitions.filters.get(filterName);
    if ( configuration[filterName].column) {
      columns.push(filter);
    }
  }
  return columns;
}
