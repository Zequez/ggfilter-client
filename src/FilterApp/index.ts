import FilterApp from './components/FilterApp';
import FilterAppPage from './components/FilterAppPage';
import RedirectToCurrentFilter from './components/RedirectToCurrentFilter';

import { ID } from './filter/selectors';
import reducer from './filter/reducer';
import * as sagas from './filter/sagas';
import * as a from './filter/actions';

export const Main = FilterAppPage;
export {
  ID,
  reducer,
  sagas
};
export const actions = {
  setColumn: a.setColumn,
  setQuery: a.setQuery,
  setSort: a.setSort
};
