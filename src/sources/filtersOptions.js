var yearsAgo = function (years) {
  return Math.floor(new Date(new Date() - 365 * 24 * 60 * 60 * 1000 * years) / 1000)
}

var generateDatesBack = function (years) {
  var hash = {
    range: [null, yearsAgo(1 / 12), yearsAgo(3 / 12), yearsAgo(6 / 12), yearsAgo(1)],
    rangeLabels: ['Now', '1 month', '3 months', '6 months', '1 year'],
    fallbackRangeTo: 'right',
    projectFallbackMap: true,
    gtInterpolation: 'Last %s',
    ltInterpolation: 'Older than %s'
  }

  for (var i = 2; i < years; i++) {
    hash.range.push(yearsAgo(i))
    hash.rangeLabels.push(`${i} years`)
  }

  hash.range = hash.range.reverse()
  hash.rangeLabels = hash.rangeLabels.reverse()
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
      dateBack: generateDatesBack(12)
    }
  }
}
