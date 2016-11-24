import autoTitleDefinitions from '../config/autoTitleDefinitions'
import { escapeHtml as h } from 'shared/lib/utils'
import defaultFilter from '../config/defaultFilter'
import filtersDefinitions from '../lib/definitions'

function strongificate (text) {
  return text.replace(/(<)|(>)/g, (_, lt, gt) => lt ? '<strong>' : '</strong>')
}

export default function generateAutoTitle (filter, definitions = autoTitleDefinitions, store) {
  let titles = []

  if (Object.keys(filter.params).length > 0) {
    for (let filterName in definitions) {
      let filterParams = filter.params[filterName]
      if (typeof filterParams === 'object') {
        let definition = definitions[filterName]
        let title = definition(filterParams, store)
        if (title instanceof Array) {
          let escapedTitle = title[0]
          let vals = title.slice(1)
          for (let val of vals) {
            escapedTitle = escapedTitle.replace('%s', h(val))
          }
          title = escapedTitle
        }
        title = strongificate(title)
        titles.push(title)
      }
    }
  }

  let shouldAddSortInfo = filter.sort && (
    filter.sort.filter !== defaultFilter.sort.filter ||
    filter.sort.asc !== defaultFilter.sort.asc
  )

  if (shouldAddSortInfo) {
    let direction = filter.sort.asc ? 'ascending' : 'descending'
    // FIXME: Doesn't work for filters with a name != sort column
    let title = filtersDefinitions.filters[filter.sort.filter].title
    titles.push(strongificate(`sorted by <${h(title)} in ${direction} order>`))
  }

  if (titles.length) {
    let title = titles.join(', ')
    return 'games ' + title
  } else {
    return null
  }
}
