import { createSelector } from 'reselect'
import { NAME } from './constants'

export const games = (s) => s[NAME].batches
export const totalCount = (s) => s[NAME].totalCount
export const loadedCount = (s) =>
  s[NAME].batches.reduce((t, v) => t + v.length, 0)

export const allLoaded = createSelector(
  totalCount,
  loadedCount,
  (total, loaded) => total === loaded
)

export const isFetching = (s) => s[NAME].fetching
export const failed = (s) => s[NAME].failed
