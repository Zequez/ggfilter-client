import Filters from './filtersTypes';
import Columns from './columnsTypes';
import { AnyQuery } from './queryTypes';

export default interface QueryType {
  params: {[key in Filters]?: AnyQuery};
  columns: Columns[];
  sort: {
    column: Columns;
    asc: boolean;
  };
};
