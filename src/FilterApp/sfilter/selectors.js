import { createSelector } from 'reselect'
import { NAME } from './constants'

export const sfilterSelector = (s) => s[NAME].data
export const sfilterSelectorStage = (s) => s[NAME].stageData

export const isDirty = (s) => s[NAME].dirty || s[NAME].filterDirty
export const sFilterIsDirty = (s) => s[NAME].dirty
export const filterIsDirty = (s) => s[NAME].filterDirty
