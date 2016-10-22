import { createSelector } from 'reselect'
import { NAME } from './constants'
import TableWidthCalculator from '../ui/lib/TableWidthCalculator'
const { visibleFiltersDefinitionsSelector } = require('../filter').selectors

export const getColumnsWidth = (s) => s[NAME].columnsWidth
export const getTab = (s) => s[NAME].tab

export const tableWidthCalculator = createSelector(
  getColumnsWidth,
  visibleFiltersDefinitionsSelector,
  (columnsWidth, filters) => {
    if (!document) return null
    let docSize = document.documentElement.clientWidth
    return new TableWidthCalculator(filters, columnsWidth, docSize)
  }
)

export const getTrueColumnsWidth = createSelector(
  tableWidthCalculator,
  (calc) => calc ? calc.columnsWidth() : []
)

export const getTrueTableWidth = createSelector(
  tableWidthCalculator,
  (calc) => calc ? calc.tableWidth() : 1000
)
