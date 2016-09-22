export default function generateAutoTitle (params, definitions) {
  let titles = []

  for (let filterName in definitions) {
    let param = params[filterName]
    if (param) {
      let definition = definitions[filterName]
      if (typeof definition === 'function') {
        titles.push(definition(param))
      } else {
        let title = definition
        for (let p in param) {
          title = title.replace(`{${p}}`, param[p])
        }
        titles.push(title)
      }
    }
  }

  return titles.join(', ')
}
