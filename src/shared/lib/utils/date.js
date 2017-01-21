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

export function elapsedTime (start, end) {
  start = sureDate(start)
  end = sureDate(end)
  return parseInt((end - start) / 1000)
}

export function timeAgo (date) {
  return timeInWords((new Date().valueOf() - date.valueOf()) / 1000)
}

export function timeInWords (time, useOne = true, shorthands = false) {
  let timespans = shorthands ? [
    [1, 's'],
    [60, 'm'],
    [60 * 60, 'h'],
    [60 * 60 * 24, 'd'],
    [60 * 60 * 24 * 7, 'w'],
    [60 * 60 * 24 * 30, 'mo'],
    [60 * 60 * 24 * 365, 'y']
  ] : [
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

  let words = timeInWordsFromTimespans(time, timespans.reverse(), useOne, shorthands)

  return negative ? `[${words}]` : words
}

export function timeInWordsFromTimespans (time, timespans, useOne = false, shorthands = false) {
  let span = timespans[0]
  let result = Math.floor(time / span[0])
  // let rest = time % span[0]

  if (result === 1 && !shorthands) {
    return useOne ? `${result} ${span[1]}` : span[1]
  } else if (timespans.length === 1 || result >= 1) {
    return shorthands ? `${result}${span[1]}` : `${result} ${span[1]}s`
  }

  timespans.shift()

  return timeInWordsFromTimespans(time, timespans, useOne, shorthands)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export function formatShortDate (date) {
  let [year, month, day] = formatShortDateArray(date)
  return `${day} ${month} ${year}`
}

export function formatShortDateArray (date) {
  date = sureDate(date)
  let day = padTime0(date.getUTCDate().toString())
  let month = MONTHS[date.getUTCMonth()]
  let year = date.getUTCFullYear()
  return [year, month, day]
}

export function isFirstDayOfTheYear (date) {
  return date.getUTCDate() === 1 && date.getUTCMonth() === 0
}

export function formatShortDateTime (date) {
  date = sureDate(date)
  let hour = padTime0(date.getHours())
  let minute = padTime0(date.getMinutes())
  let day = padTime0(date.getDate().toString())
  let month = MONTHS[date.getMonth()]
  let year = date.getFullYear()
  hour = '00'.substring(0, 2 - day.length) + day
  minute = '00'.substring(0, 2 - day.length) + day
  day = '00'.substring(0, 2 - day.length) + day
  return `${hour}:${minute} - ${day} ${month} ${year}`
}

function padTime0 (unit) {
  return '00'.substring(0, 2 - unit.length) + unit
}

function sureDate (date) {
  return date.constructor !== Date ? new Date(date) : date
}
