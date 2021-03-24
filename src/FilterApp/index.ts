import FilterAppPage from './components/FilterAppPage';
import RedirectToCurrentFilter from './components/RedirectToCurrentFilter';
import QueryChipList from './components/QueryChipsList';

import { ID } from './filter/selectors';
import reducer from './filter/reducer';
import * as a from './filter/actions';
import * as stateTypes from './filter/stateTypes';

export {
  ID,
  reducer,
  RedirectToCurrentFilter,
  QueryChipList,
  FilterAppPage
};
export const actions = {
  setColumn: a.setColumn,
  setQuery: a.setQuery,
  setSort: a.setSort,
  setFilter: a.setFilter
};
export import types = stateTypes;
