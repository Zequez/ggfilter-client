export function relativeTimeInWords (date, past = '%s ago', futu = '%s in the future') {
  let distance = ((new Date().valueOf()) - date.valueOf()) / 1000
  let pastFun = past.call ? past : (text) => past.replace(/%s/, text)
  let futuFun = futu.call ? futu : (text) => futu.replace(/%s/, text)

  if (distance >= 0) { // Past
    return pastFun(timeInWords(distance))
  } else { // Future
    return futuFun(timeInWords(-distance))
  }
}

export function timeAgo (date) {
  return timeInWords((new Date().valueOf() - date.valueOf()) / 1000)
}

export function timeInWords (time, useOne = true) {
  let timespans = [
    [1, 'second'],
    [60, 'minute'],
    [60 * 60, 'hour'],
    [60 * 60 * 24, 'day'],
    [60 * 60 * 24 * 7, 'week'],
    [60 * 60 * 24 * 30, 'month'],
    [60 * 60 * 24 * 365, 'year']
  ]

  let negative = time < 0
  if (negative) time = -time

  let words = timeInWordsFromTimespans(time, timespans, useOne)

  return negative ? `[${words}]` : words
}

export function timeInWordsFromTimespans (time, timespans, useOne = false) {
  let span = timespans[0]
  if (time >= span[0] && time < span[0] * 2) {
    return useOne ? `1 ${span[1]}` : span[1]
  } else if (timespans.length === 1 || (time > span[0] && time < timespans[1][0])) {
    return `${Math.floor(time / span[0])} ${span[1]}s`
  }

  timespans.shift()

  return timeInWordsFromTimespans(time, timespans, useOne)
}
