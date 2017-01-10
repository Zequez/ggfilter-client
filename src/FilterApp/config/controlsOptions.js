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
    range: {
      price: {
        toInput: (value) => value / 100,
        fromInput: (value) => value * 100,
        prefix: '$ ',
        focus: 'max'
      }
    }
  },
  shortcuts: {
    timeAgo: [
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
    timeAbsolute: lastYearsDates(10)
  }
}
