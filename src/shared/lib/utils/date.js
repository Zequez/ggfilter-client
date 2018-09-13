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

// const TIMESPANS = {
//   s: 1,
//   m: 60,
//   h: 60 * 60,
//   d: 60 * 60 * 24,
//   w: 60 * 60 * 24 * 7,
//   mo: 60 * 60 * 24 * 30,
//   y: 60 * 60 * 24 * 365
// };
// const TIMESPANS_WORDING = {
//   short: ['s', 'm', 'h', 'd', 'w', 'mo', 'y'],
//   long: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
//   plural: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']
// }

export function timeInWords (time, useOne = true, shorthands = false) {
  let words = '';

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

  words = timeInWordsFromTimespans(time, timespans.concat([]).reverse(), true, useOne, shorthands)
  if (!words) words = timeInWordsFromTimespans(time, timespans.reverse(), false, useOne, shorthands)

  return negative ? `[${words}]` : words
}

export function timeInWordsFromTimespans (time, timespans, whole, useOne, shorthands) {
  if (time < 1) return null ;

  let span = timespans[0]
  let result = whole ? time / span[0] : Math.floor(time / span[0])
  let rest = time % span[0]
  let word = (result === 1 || shorthands) ? span[1] : span[1] + 's';
  let num = result === 1 && !useOne ? '' : result.toString();

  if ((whole && rest !== 0) || result < 1) {
    timespans.shift();
    if (timespans.length === 0) return null;
    return timeInWordsFromTimespans(time, timespans, whole, useOne, shorthands);
  } else {
    return `${num} ${word}`
  }
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
  hour = '00'.substring(0, 2 - hour.length) + hour
  minute = '00'.substring(0, 2 - minute.length) + minute
  day = '00'.substring(0, 2 - day.length) + day
  return `${hour}:${minute} - ${day} ${month} ${year}`
}

function padTime0 (unit) {
  return '00'.substring(0, 2 - unit.length) + unit
}

function sureDate (date) {
  return date.constructor !== Date ? new Date(date) : date
}
