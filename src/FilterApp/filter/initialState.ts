import definitions, { FiltersNames } from '../../Definitions';
import { HyperFilter, State } from './stateTypes';
import configuration from './initialConfiguration';

const filter: HyperFilter = {
  sid: null,
  name: null,
  slug: null,
  parentId: null,
  configuration: configuration,
  ownershipHash: null
};

const initialState: State = {
  sfilter: filter,
  sfilterError: null,
  sfilterLoading: false,

  filter: filter,
  ownershipHashes: localStorage.ownershipHashes ? JSON.parse(localStorage.ownershipHashes) : {},

  games: {
    batches: [],
    loading: false,
    error: null,
    totalCount: null
  },

  frontPageFilters: []
};

export default initialState;
