import invert from 'lodash/invert'
import { isEmpty } from 'shared/lib/utils'
import definitions from './definitions'

const keysMap = {
  value: 'v',
  gt: 'g',
  lt: 'l',
  tags: 't',
  filter: 'c',
  asc: 'a',
  or: 'o',
  hl: 'h'
}

const charStartFrom = 32

const mapKeys = invert(keysMap)

const sortKey = String.fromCharCode(charStartFrom)
const sortAsc = 'a'
const sortCol = 'c'

function toNameKey (filterName) {
  return String.fromCharCode(charStartFrom + definitions.filters[filterName].id)
}

function fromNameKey (filterKey) {
  return definitions.byId[filterKey.charCodeAt(0) - charStartFrom]
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

function toMinSort (sort) {
  let newSort = {}
  if (sort.filter) newSort[sortCol] = toNameKey(sort.filter)
  if (sort.asc != null) newSort[sortAsc] = sort.asc ? 1 : 0
  return newSort
}

function fromMinSort (sort) {
  let newSort = {}
  if (sort[sortCol]) newSort.filter = fromNameKey(sort[sortCol])
  if (sort[sortAsc] != null) newSort.asc = !!sort[sortAsc]
  return newSort
}

// Remove defs = definitions  after you figure out a way to do dependency injection
export function minimize (filter) {
  let minimized = {}
  if (filter.params) {
    for (let name in filter.params) {
      minimized[toNameKey(name, definitions)] = toMappedKeys(filter.params[name])
    }
  }
  if (filter.sort && !isEmpty(filter.sort)) {
    minimized[sortKey] = toMinSort(filter.sort, definitions)
  }

  return minimized
}

export function maximize (minFilt) {
  let maximized = {
    params: {},
    sort: {}
  }

  if (!minFilt) return maximized

  for (let key in minFilt) {
    if (key !== sortKey) {
      maximized.params[fromNameKey(key)] = fromMappedKeys(minFilt[key])
    }
  }

  if (minFilt[sortKey]) {
    maximized.sort = fromMinSort(minFilt[sortKey])
  }

  return maximized
}

export function toB64 (obj) {
  return btoa(JSON.stringify(obj))
    .replace(/=+$/, '')
    .replace(/\+/g, '_')
    .replace(/-/g, '/')
}

export function fromB64 (str) {
  return JSON.parse(atob(str.replace(/_/g, '+').replace(/\//g, '-')))
}

const warn = (msg, value) => {
  console.warn(`Error parsing filter: ${msg}`, value)
}

export function encode (filter) {
  if (!(isEmpty(filter.params) && isEmpty(filter.sort))) {
    // console.log(filter)
    let minFilter = minimize(filter)
    // console.log(minFilter)
    return toB64(minFilter)
  } else {
    return ''
  }
}

export function decode (encodedDelta) {
  if (!encodedDelta) return maximize(null)

  let filter
  if (encodedDelta) {
    try {
      filter = maximize(fromB64(encodedDelta))
    } catch (e) {
      warn('Malformed encoded filter slug', encodedDelta)
      filter = maximize(null)
    }
  } else {
    filter = maximize(null)
  }

  return filter
}
