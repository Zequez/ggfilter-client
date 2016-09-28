import autoTitleDefinitions from 'sources/autoTitleDefinitions'

export default function generateAutoTitle (params, definitions = autoTitleDefinitions, store) {
  let titles = []

  for (let filterName in definitions) {
    let param = params[filterName]
    if (param) {
      let definition = definitions[filterName]
      titles.push(definition(param, store))
    }
  }

  let title = titles.join(', ')
  return 'Games ' + title// && (title[0].toLocaleUpperCase() + title.slice(1))
}
