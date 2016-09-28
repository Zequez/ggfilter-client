import autoTitleDefinitions from 'sources/autoTitleDefinitions'
import { escapeHtml } from 'lib/utils'

export default function generateAutoTitle (params, definitions = autoTitleDefinitions, store) {
  let titles = []

  for (let filterName in definitions) {
    let filterParams = params[filterName]
    if (filterParams) {
      let definition = definitions[filterName]
      let title = definition(filterParams, store)
      if (title instanceof Array) {
        let escapedTitle = title[0]
        let vals = title.slice(1)
        for (let val of vals) {
          escapedTitle = escapedTitle.replace('%s', escapeHtml(val))
        }
        title = escapedTitle
      }
      title = title.replace(/(<)|(>)/g, (_, lt, gt) => lt ? '<strong>' : '</strong>')
      titles.push(title)
    }
  }

  let title = titles.join(', ')
  return 'Games ' + title// && (title[0].toLocaleUpperCase() + title.slice(1))
}
