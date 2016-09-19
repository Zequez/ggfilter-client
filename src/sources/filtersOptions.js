import {merge} from 'lib/utils'

var yearsAgo = function (years) {
  return Math.floor(new Date(new Date() - 365*24*60*60*1000*years) / 1000)
}

var generateDatesBack = function (years) {
  var hash = {
    range: [null, yearsAgo(1/12), yearsAgo(3/12), yearsAgo(6/12), yearsAgo(1)],
    rangeLabels: ['Now', '1 month', '3 months', '6 months', '1 year'],
    fallbackRangeTo: 'right',
    projectFallbackMap: true,
    gtInterpolation: 'Last %s',
    ltInterpolation: 'Older than %s',
  }

  for (var i = 2; i < years; i++) {
    hash.range.push(yearsAgo(i))
    hash.rangeLabels.push(`${i} years`)
  }

  hash.range = hash.range.reverse()
  hash.rangeLabels = hash.rangeLabels.reverse()
  return hash
}

// range: [1, 2, 3, 4, 5],
// rangeLabels: null,
// nullifyStart: true,
// nullifyEnd: true,
// fallbackRange: null, // [first, last]
// fallbackRangeTo: 'all', // 'left' || 'right' || 'all' || 'no'
// projectFallbackMap: false,
// labelInterpolation: '%s',
// gtInterpolation: '≥%s',
// ltInterpolation: '≤%s',
// rangeInterpolation: '[%s to %s]',
// fullRangeName: 'Any',
// namedRanges: {}, // eg: {'Free': [0, 0]}
// mappedRanges: [
//   // eg: [[1, 1], [1, 1]] // Prevents it from mapping to 1-5
//   // eg: [[5, 5],   [1, 5]] // Maps a single 5 to 1-5
//   // eg: [[1, 2], [1, 1]] // Maps to 1 if selecting the range 1-2
// ]

// class FancyRangeFilterOptions {
//   // This is the data sent to the server
//   units = []
//   unitsLabels = []
//   rangesLabels = []
//
//   null Infinity
//
//   rangesMap = []
//   unitsMap = []
//
//   unitLabelInterpolation = '%s'
//   rangeLabelInterpolation = '%s to %s'
//
//   constructor (options) {
//
//   }
// }
//
// let priceRange = new FancyRangeFilterOptions(
//
// )

export default {
  filters: {
    range: {
      price: {
        range: [0, 1, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, Infinity],
        namedRanges: {
          '0': 'Free',
          '1-Infinity': 'Non-free',
          '1': '$0.01'
        },
        label: {
          fullRangeLabel: 'Any price',
          interpolation: (v) => '$' + Math.floor(v / 100)
        },
        mappedRanges: {
          '0-1': [0, 0], // Override strictlyRangeMode
          // '0': [0, 0], // Override autohook
          // '1': [1, Infinity],
          // 'Infinity': [1, Infinity]
        },
        strictlyRangeMode: true
      },
      discount: {
        range: [0, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        namedRanges: {
          '0': 'NotOnSale',
          '1-100': 'On sale',
          '100': 'FREE!?'
        },
        mappedRanges: {
          '0': [0, 0] // Override the autohook
        },
        label: {
          interpolation: '{v}%'
        },
        autohook: 100
      },
      right: function(range, interpol) {
        let r = {
          range: range,
          fallbackRangeTo: 'right',
          projectFallbackMap: true
        }
        if (interpol) r.labelInterpolation = interpol
        return r
      },
      left: function(range, interpol) {
        let r = {
          range: range,
          fallbackRangeTo: 'left',
          projectFallbackMap: true
        }
        if (interpol) r.labelInterpolation = interpol
        return r
      },
      dateBack: generateDatesBack(12),
    }
  }
}
