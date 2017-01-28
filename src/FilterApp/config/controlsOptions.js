const lastYearsDates = (yearsCount) => {
  let endYear = new Date().getFullYear()
  let startYear = endYear - yearsCount
  let shortcuts = []
  for (let i = endYear; i >= startYear; --i) {
    let startDate = Date.parse(`${i}-1-1`) / 1000
    let endDate = Date.parse(`${i + 1}-1-1`) / 1000
    shortcuts.push({
      gt: startDate,
      lt: endDate
    })
  }
  return shortcuts
}

export default {
  controls: {
    price: {
      toInput: (value) => value / 100,
      fromInput: (value) => value * 100,
      prefix: '$ ',
      focus: 'max'
    }
  },
  shortcuts: {
    timeAgo: [
      {gt: null, lt: 0},
      {gt: 24 * 60 * 60, lt: 0},
      {gt: 7 * 24 * 60 * 60, lt: 0},
      {gt: 30 * 24 * 60 * 60, lt: 0},
      {gt: 3 * 30 * 24 * 60 * 60, lt: 0},
      {gt: 6 * 30 * 24 * 60 * 60, lt: 0},
      {gt: 365 * 24 * 60 * 60, lt: 0},
      {gt: 2 * 365 * 24 * 60 * 60, lt: 0},
      {gt: 5 * 365 * 24 * 60 * 60, lt: 0},
      {gt: 10 * 365 * 24 * 60 * 60, lt: 0},
      {gt: null, lt: 365 * 24 * 60 * 60},
      {gt: 0, lt: null}
    ],
    timeAbsolute: lastYearsDates(10),
    price: [
      {gt: 0, lt: 0},
      {gt: 1, lt: null},
      {gt: 1, lt: 300},
      {gt: 1, lt: 500},
      {gt: 1, lt: 1000},
      {gt: 1, lt: 1500},
      {gt: 1, lt: 2000}
    ],
    discount: [
      {gt: 0, lt: 0},
      {gt: 1, lt: null},
      {gt: 100, lt: 100},
      {gt: 10, lt: null},
      {gt: 20, lt: null},
      {gt: 30, lt: null},
      {gt: 40, lt: null},
      {gt: 50, lt: null},
      {gt: 60, lt: null},
      {gt: 70, lt: null},
      {gt: 80, lt: null},
      {gt: 90, lt: null}
    ],
    ratio: [
      {gt: 50, lt: null},
      {gt: 60, lt: null},
      {gt: 70, lt: null},
      {gt: 80, lt: null},
      {gt: 90, lt: null},
      {gt: 95, lt: null},
      {gt: 97, lt: null},
      {gt: 98, lt: null},
      {gt: 99, lt: null}
    ]
  },
  chips: {
    price: {
      '': (v) => '$' + Math.floor(v / 100),
      '1': '$0.01',

      '<->': 'Any price',
      '0': 'Free',
      '1-null': 'Non-free',

      '1-*': '≤{ei}',
      '0-*': '≤{ei} & Free'
    },
    discount: {
      '': '{v}%',
      '0': 'Not on sale',
      '1->': 'On sale',
      '100': 'FREE!?'
    }
  }
}
