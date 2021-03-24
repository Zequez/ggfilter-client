import Api from 'src/Api';
import { u } from 'shared/lib/utils/store';
import { types } from 'src/FilterApp';

interface State {
  ownFilters: types.HyperFilter[];
  goodFilters: types.HyperFilter[];
  randomFilters: types.HyperFilter[];
}

const initialState = {
  ownFilters: [],
  goodFilters: [],
  randomFilters: []
};

export const SET_OWN_FILTERS = 'SET_OWN_FILTERS';

export function loadOwnFilters (limit?: number) {
  return (dispatch) => {
    let ownershipHashes = Object.values(JSON.parse(localStorage.ownershipHashes || '{}'));
    Api.filters.index({ownershipHashes, limit}).then((filters) => {
      dispatch({ type: SET_OWN_FILTERS, filters });
    });

  };
}

export default function reducer (state = initialState, action) {
  if (action.type === SET_OWN_FILTERS) {
    state = u(state, { ownFilters: {$set: action.filters} });
  }
  return state;
}
