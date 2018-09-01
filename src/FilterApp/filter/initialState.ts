import definitions, { FiltersNames } from '../../Definitions';
import { HyperFilter, State } from './stateTypes';
import configuration from './initialConfiguration';

const filter: HyperFilter = {
  sid: null,
  nameSlug: null,
  userId: null,
  parent: null,

  name: null,

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
