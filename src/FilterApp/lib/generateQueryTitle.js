import { escapeHtml as h } from 'shared/lib/utils'
import queryTitleDefinitions from '../config/autoTitleDefinitions'

function strongificate (text) {
  return text.replace(/(<)|(>)/g, (_, lt, gt) => lt ? '<strong>' : '</strong>')
}

function weaken (text) {
  return text.replace(/(<)|(>)/g, '')
}

export default function generateQueryTitle (filter, query, steroids = false) {
  let title = queryTitleDefinitions[filter.name](query, filter)
  if (title instanceof Array) {
    let escapedTitle = title[0]
    let vals = title.slice(1)
    for (let val of vals) {
      escapedTitle = escapedTitle.replace('%s', h(val))
    }
    title = escapedTitle
  }

  return steroids ? strongificate(title) : weaken(title)
}
