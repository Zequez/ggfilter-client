import invert from 'lodash/invert'
import definitions from './definitions'

const keysMap = {
  value: 'v',
  gt: 'g',
  lt: 'l',
  tags: 't',
  column: 'c',
  asc: 'a'
}

const charStartFrom = 32

const mapKeys = invert(keysMap)

const sortKey = String.fromCharCode(charStartFrom)
const sortAsc = 'a'
const sortCol = 'c'

function isEmpty (obj) {
  for (let key in obj) {
    return false
  }
  return true
}

function toNameKey (filterName, defs) {
  return String.fromCharCode(charStartFrom + defs.filters[filterName].id)
}

function fromNameKey (filterKey, defs) {
  return defs.byId[filterKey.charCodeAt(0) - charStartFrom]
}

function toMappedKeys (obj) {
  if (obj === true) return 1
  if (obj === false) return 0
  let newObj = {}
  for (let key in obj) {
    newObj[keysMap[key]] = obj[key]
  }
  return newObj
}

function fromMappedKeys (obj) {
  if (obj === 1) return true
  if (obj === 0) return false
  let newObj = {}
  for (let key in obj) {
    newObj[mapKeys[key]] = obj[key]
  }
  return newObj
}

function toMinSort (sort, defs) {
  let newSort = {}
  if (sort.column) newSort[sortCol] = toNameKey(sort.column, defs)
  if (sort.asc) newSort[sortAsc] = sort.asc ? 1 : 0
  return newSort
}

function fromMinSort (sort, defs) {
  let newSort = {}
  if (sort[sortCol]) newSort.column = fromNameKey(sort[sortCol], defs)
  if (sort[sortAsc]) newSort.asc = !!sort[sortAsc]
  return newSort
}

// Remove defs = definitions  after you figure out a way to do dependency injection
export function minimize (filter, defs = definitions) {
  let minimized = {}
  if (filter.params) {
    for (let name in filter.params) {
      minimized[toNameKey(name, defs)] = toMappedKeys(filter.params[name])
    }
  }
  if (filter.sort && !isEmpty(filter.sort)) {
    minimized[sortKey] = toMinSort(filter.sort, defs)
  }

  return minimized
}

export function maximize (minFilt, defs = definitions) {
  let maximized = {
    params: {},
    sort: {}
  }

  for (let key in minFilt) {
    if (key !== sortKey) {
      maximized.params[fromNameKey(key, defs)] = fromMappedKeys(minFilt[key])
    }
  }

  if (minFilt[sortKey]) {
    maximized.sort = fromMinSort(minFilt[sortKey], defs)
  }

  return maximized
}

export function encode (filter) {
  let minFilter = minimize(filter)
  return btoa(JSON.stringify(minFilter)).replace(/=+$/, '')
}

export function decode (encodedMinFilter) {
  try {
    let minFilter = JSON.parse(atob(encodedMinFilter))
    return maximize(minFilter)
  } catch (e) {
    return null
  }
}
