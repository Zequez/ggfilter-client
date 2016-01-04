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

export default {
  filters: {
    range: {
      price: {
        range: [0, 1, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000, 6000, null],
        rangeLabels: ['Free', '$0.01', '$1', '$3', '$5', '$10', '$15', '$20', '$30', '$40', '$50', '$60', '∞'],
        namedRanges: {
          'Free': [0, 0],
          'Non-free': [1, null],
          'Any price': [0, null]
        },
        mappedRanges: [
          [[0, 0],         [0, 0]],
          [[0, 1],         [0, 0]],
          [[null, null],   [1, null]],
          [[1, 1],         [1, null]],
        ]
      },
      discount: {
        range: [0, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        labelInterpolation: '%s%',
        namedRanges: {
          'NotOnSale': [0, 0],
          'On sale':     [1, 100],
          'Any':         [0, 100],
          'FREE!?':      [100, 100]
        },
        mappedRanges: [
          [[0, 0],     [0, 0]],
          [[0, 1],     [0, 0]],
          [[100, 100], [100, 100]],
          [[1, 1],     [1, 100]],
        ],
        fallbackRange: [1, 100]
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
