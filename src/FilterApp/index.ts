import FilterApp from './components/FilterApp';
import FilterAppPage from './components/FilterAppPage';
import RedirectToCurrentFilter from './components/RedirectToCurrentFilter';

import { ID } from './filter/selectors';
import reducer from './filter/reducer';
import * as sagas from './filter/sagas';
import * as actions from './filter/actions';

module.exports = {
  Main: FilterAppPage,
  ID: ID,
  reducer: reducer,
  sagas: sagas,

  actions: {
    setColumn: actions.setColumn,
    setQuery: actions.setQuery,
    setSort: actions.setSort
  }
};
