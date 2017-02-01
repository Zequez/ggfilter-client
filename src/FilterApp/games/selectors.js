import { createSelector } from 'reselect'

export const ID = 'games'
export const games = (s) => s[ID].batches
export const totalCount = (s) => s[ID].totalCount
export const loadedCount = (s) =>
  s[ID].batches.reduce((t, v) => t + v.length, 0)

export const allLoaded = createSelector(
  totalCount,
  loadedCount,
  (total, loaded) => total === loaded
)

export const isFetching = (s) => s[ID].fetching
export const failed = (s) => s[ID].failed
