import { createSelector } from 'reselect'

export const ID = 'layout'
export const baseState = (s) => s[ID]

export const drawerOpen = createSelector(baseState, (s) => s.drawerOpen)
