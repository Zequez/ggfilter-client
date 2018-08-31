import definitions, { FiltersNames } from '../../Definitions';
import { Filter, State } from './stateTypes';
import configuration from './initialConfiguration';

const filter: Filter = {
  sid: null,
  nameSlug: null,
  userId: null,

  name: 'Name of your filter',

  configuration: configuration,
};

const initialState: State = {
  sfilter: filter,
  sfilterError: null,
  sfilterLoading: false,

  filter: filter,

  games: {
    batches: [],
    loading: false,
    error: null,
    totalCount: null
  },

  frontPageFilters: []
};

export default initialState;
