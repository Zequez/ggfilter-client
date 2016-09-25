var yearsAgo = function (years) {
  return Math.floor(365 * 24 * 60 * 60 * years)
}

var generateDatesBack = function (years) {
  let range = [
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
      gtInterpolation: 'Last {si}',
      ltInterpolation: 'Older than {ei}',
      namedRanges: {
        [range[0]]: 'Now',
        [range[1]]: '24 hours',
        [range[2]]: '1 week',
        [range[3]]: '1 month',
        [range[4]]: '3 months',
        [range[5]]: '6 months',
        [range[6]]: '1 year'
      }
    }
  }

  for (var i = 2; i <= years; i++) {
    let ago = yearsAgo(i)
    hash.range.push(ago)
    hash.label.namedRanges[ago] = `${i} years`
  }
  hash.range.push(null)

  hash.range = hash.range.reverse()
  return hash
}

export default {
  filters: {
    range: {
      price: {
        range: [0, 1, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, Infinity],
        label: {
          fullRangeLabel: 'Any price',
          interpolation: (v) => '$' + Math.floor(v / 100),
          namedRanges: {
            '0': 'Free',
            '1-Infinity': 'Non-free',
            '1': '$0.01'
          }
        },
        mappedRanges: {
          '0-1': [0, 0], // Override strictlyRangeMode
          '0': [0, 0], // Override autohook
          '1': [1, Infinity]
        },
        autohook: 1
      },
      discount: {
        range: [0, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        mappedRanges: {
          '0': [0, 0] // Override the autohook,
        },
        label: {
          interpolation: '{v}%',
          namedRanges: {
            '0': 'NotOnSale',
            '1-100': 'On sale',
            '100': 'FREE!?'
          }
        },
        autohook: 100
      },
      dateBack: generateDatesBack(15)
    }
  }
}
