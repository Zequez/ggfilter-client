// import { createSelector } from 'reselect'
import { NAME } from './constants'

export const totalCountSelector = (s) => s[NAME].totalCount
export const loadedCountSelector = (s) =>
  s[NAME].batches.reduce((t, v) => t + v.length, 0)
