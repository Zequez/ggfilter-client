import { createSelector } from 'reselect';
import definitions, { FiltersNames } from '../../Definitions';
import { Query, AnyQuery } from '../../Api';
import { State, FiltersConfiguration, FilterConfig } from './stateTypes';

export const ID = 'filter';
export const base = (s) => <State> s[ID];
export const filter = createSelector(
  base,
  (ss) => ss.filter
);

/********************/
/* Filter Stuff
/********************/

export const configuration = createSelector(filter, (f) => f.configuration);
export const currentSortRaw = (configuration: FiltersConfiguration) => {
  let filterName: keyof  typeof configuration;
  for (filterName in configuration) {
    if (configuration[filterName].sort != null) {
      return filterName;
    }
  }
};
export const currentSort = createSelector(configuration, currentSortRaw);

/********************/
/* Sfilter stuff
/********************/

export const sfilter = createSelector(base, (ss) => ss.sfilter);
export const sfilterIsDirty = createSelector(sfilter, filter, (sf, f) => sf !== f);
export const secrets = createSelector(base, () =>
  window.localStorage.getItem('secrets') && JSON.parse(
    window.localStorage.getItem('secrets')
  ) || {}
);
export const actualFilterIsDirty = createSelector(sfilter, filter, (sf, f) => true );

/********************/
/* Games
/********************/

export const games = createSelector(base, (b) => b.games);
export const gamesBatches = createSelector(games, (games) => games.batches);
export const gamesTotalCount = createSelector(games, (games) => games.totalCount);
export const gamesCurrentPage = createSelector(gamesBatches, (batches) => batches.length);
export const gamesLoadedCount = createSelector(gamesBatches, (batches) =>
  batches.reduce((t, v) => t + v.length, 0));
export const gamesLoading = createSelector(games, (games) => games.loading);
export const gamesError = createSelector(games, (games) => games.error);
export const gamesAllLoaded = createSelector(
  gamesTotalCount,
  gamesLoadedCount,
  (total, loaded) => total === loaded
);
export const gamesFailed = createSelector(gamesError, (error) => !!error);

/********************/
/* Other stuff
/********************/

export const filterForApi = createSelector(
  configuration,
  currentSort,
  (configuration, currentSort) => {
    let query: Query = {
      params: {},
      columns: [],
      sort: {
        column: null,
        asc: null
      }
    };

    let filterName: keyof typeof configuration;
    for (filterName in configuration) {
      let config = configuration[filterName];
      let filter = definitions.filters.get(filterName);

      if (config.query) {
        query.params[filter.api] = config.query;
      }

      if (config.column) {
        query.columns = query.columns.concat(Object.values(filter.cellInputs));
      }

      if (config.sort) {
        query.sort = { column: filter.sort, asc: !config.sort };
      }
    }

    query.columns = query.columns.filter((val, index, self) =>
      self.indexOf(val) === index);

    return query;
  }
);
