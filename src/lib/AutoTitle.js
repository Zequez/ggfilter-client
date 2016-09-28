import autoTitleDefinitions from 'sources/autoTitleDefinitions'

export default function generateAutoTitle (params, definitions = autoTitleDefinitions, store) {
  let titles = []

  for (let filterName in definitions) {
    let param = params[filterName]
    if (param) {
      let definition = definitions[filterName]
      if (typeof definition === 'function') {
        titles.push(definition(param, store))
      } else {
        let title = definition
        for (let p in param) {
          title = title.replace(`{${p}}`, param[p])
        }
        titles.push(title)
      }
    }
  }

  let title = titles.join(', ')
  return 'Games ' + title// && (title[0].toLocaleUpperCase() + title.slice(1))
}
