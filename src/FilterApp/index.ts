import FilterApp from './components/FilterAppPage';
import RedirectToCurrentFilter from './components/RedirectToCurrentFilter';

import { ID } from './filter/selectors';
import reducer from './filter/reducer';
import * as sagas from './filter/sagas';
import * as a from './filter/actions';
import * as stateTypes from './filter/stateTypes';

export {
  ID,
  reducer,
  sagas,
  RedirectToCurrentFilter,
  FilterApp
};
export const actions = {
  setColumn: a.setColumn,
  setQuery: a.setQuery,
  setSort: a.setSort
};
export import types = stateTypes;
