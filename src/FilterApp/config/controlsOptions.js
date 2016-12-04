var yearsAgo = function (years) {
  return Math.floor(365 * 24 * 60 * 60 * years)
}

var generateDatesBack = function (years) {
  let range = [
    Infinity,
    0,
    60 * 60 * 24,
    60 * 60 * 24 * 7,
    yearsAgo(1 / 12),
    yearsAgo(3 / 12),
    yearsAgo(6 / 12),
    yearsAgo(1)
  ]
  var hash = {
    range: range,
    autohook: 0,
    label: {
      [range[1]]: 'now',
      [range[2]]: '24 hours',
      [range[3]]: '1 week',
      [range[4]]: '1 month',
      [range[5]]: '3 months',
      [range[6]]: '6 months',
      [range[7]]: '1 year',

      '0->': 'Unreleased',
      '<-0': 'Released',

      '*-0': 'Last {si}',
      '<-*': 'Older than {ei}'
    }
  }

  for (var i = 2; i <= years; i++) {
    let ago = yearsAgo(i)
    hash.range.push(ago)
    hash.label[ago] = `${i} years`
  }
  hash.range.push(null)

  hash.range = hash.range.reverse()
  return hash
}

var generateAbsoluteDates = function (startYear, endYear = null) {
  endYear = endYear || new Date().getFullYear() + 1

  let range = []
  let namedRanges = {}
  let invertedNamedRanges = {}
  for (let i = startYear; i <= endYear; ++i) {
    let date = Date.parse(`${i}-1-1`) / 1000
    range.push(date)
    namedRanges[date] = i
    invertedNamedRanges[i] = date
  }

  let rangeInterpolation = (v1, v2, iv1, iv2) => {
    return iv2 - iv1 < 2 ? iv1 : `[${iv1} to ${iv2 - 1}]`
  }

  let hash = {
    range: range,
    label: {
      '<-*': null,
      '*->': null,
      '*-*': rangeInterpolation,
      ...namedRanges
    },
    byName: invertedNamedRanges
  }

  return hash
}

export default {
  controls: {
    range: {
      price: {
        toInput: (value) => value / 100,
        fromInput: (value) => value * 100,
        prefix: '$'
      },
      discount: {
        prefix: '%'
      },
      dateBack: generateDatesBack(15),
      datesAbsolute: generateAbsoluteDates(1990)
    }
  }
}
