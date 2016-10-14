import autoTitleDefinitions from '../config/autoTitleDefinitions'
import { escapeHtml as h } from 'lib/utils'
import defaultFilter from '../config/defaultFilter'
import filterDefinitions from '../config/filtersDefinitions'

function strongificate (text) {
  return text.replace(/(<)|(>)/g, (_, lt, gt) => lt ? '<strong>' : '</strong>')
}

export default function generateAutoTitle (filter, definitions = autoTitleDefinitions, store) {
  let titles = []

  if (Object.keys(filter.params).length > 0) {
    for (let filterName in definitions) {
      let filterParams = filter.params[filterName]
      if (filterParams) {
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

  if (filter.sort && filterDefinitions[filter.sort] && filter.sort !== defaultFilter.sort) {
    let direction = filter.sortAsc ? 'ascending' : 'descending'
    let title = filterDefinitions[filter.sort].title
    titles.push(strongificate(`sorted by <${h(title)} in ${direction} order>`))
  }

  if (titles.length) {
    let title = titles.join(', ')
    return 'Games ' + title
  } else {
    return null
  }
}
