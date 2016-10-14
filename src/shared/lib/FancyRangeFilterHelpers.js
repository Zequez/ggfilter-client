/**
 * Maps a pair of range indexes to the appropiate final range
 *
 * @param {number} start The starting **index** of the range to be mapped
 * @param {number} end The ending **index** of the range to be mapped
 * @param {array} range An array of numbers (or null or Infinity at the extremes)
 * containing the valid range space.
 * @param {array} mappedRanges A map with the keys composed of interpolated range
 * **values** in the form of `${startVal}-${endVal}`, or a single value in
 * the case of single ranges. The values are the ending range values to be returned.
 * @param {number|null} autohookVal A value in the valid range space used to
 * automatically map single values to.
 * @return {[number, number]} The mapped start and end **indexes**
 *
 * @example
 * mapRange(1, 3, [0, 10, 20, 30, 40, 50], {'10-30': [20, 50]})
 * // => [2, 5]
 *
 * @example
 * mapRange(5, null, [0, 10, 20, 30, 40, 50, null], {'50-null': [20, 50]})
 * // => [2, 5]
 *
 * @example
 * // range[2] == 30
 * // range[4] == 50
 * mapRange(2, 2, [0, 10, 20, 30, 40, 50], {}, 50)
 * // => [2, 5]
 *
 * @example
 * mapRange(1, 3, [0, 10, 20, 30, 40, 50], {})
 * // => [1, 3]
 */
export function mapRange (start, end, range, mappedRanges, autohookVal, multiMode) {
  let startVal = range[start]
  let endVal = range[end]

  let isSingle = startVal === endVal
  let key = isSingle ? startVal : `${startVal}-${endVal}`

  let newStartVal, newEndVal
  if (mappedRanges[key] !== undefined) {
    ;[newStartVal, newEndVal] = mappedRanges[key]
    return [range.indexOf(newStartVal), range.indexOf(newEndVal)]
  } else if (isSingle && autohookVal !== undefined) {
    let autohook = range.indexOf(autohookVal)
    ;[start, end] = (autohook >= start ? [start, autohook] : [autohook, start])
  }

  startVal = range[start]
  endVal = range[end]

  // return [start, end]

  // console.log(start, end, multiMode)

  if (start === end && (multiMode || startVal === null || startVal === Infinity)) {
    if (end === range.length - 1) return [start - 1, end]
    else return [start, end + 1]
    // if (start === 0) return [start, end + 1]
  } else {
    return [start, end]
  }

  // if (startVal === endVal) {
  //
  // }
  //
  // if (startVal === null && endVal === null) {
  //   return [start, start + 1]
  // } else if (startVal === Infinity && endVal === Infinity) {
  //   return [start - 1, start]
  // } else {
  //   return [start, end]
  // }
}

export function mapChunkRange (chunkStart, chunkEnd, range, mappedRanges, autohookVal, strictlyRangeMode) {
  let [start, end] = chunkToRange(chunkStart, chunkEnd, strictlyRangeMode)
  ;[start, end] = mapRange(start, end, range, mappedRanges, autohookVal, strictlyRangeMode)
  ;[chunkStart, chunkEnd] = rangeToChunk(start, end, strictlyRangeMode)
  return [start, end, chunkStart, chunkEnd]
}

export function chunkToRange (chunkStart, chunkEnd, strictlyRangeMode) {
  return [chunkStart, strictlyRangeMode ? chunkEnd + 1 : chunkEnd]
}

export function rangeToChunk (start, end, strictlyRangeMode) {
  return [start, strictlyRangeMode && start !== end ? end - 1 : end]
}

export function paramsToRange (params, range, strictlyRangeMode) {
  let { gt, lt } = params

  let start = gt == null
    ? 0
    : range.indexOf(gt)
  let end = lt == null
    ? range.length - 1
    : range.indexOf(lt)

  let [chunkStart, chunkEnd] = rangeToChunk(start, end, strictlyRangeMode)

  return [start, end, chunkStart, chunkEnd]
}

export function rangeToParams (start, end, range) {
  let gt = range[start]
  let lt = range[end]
  if (lt === Infinity) lt = null
  return gt === null && lt === null ? null : {gt, lt}
}

/**
 * Calculates distance to the left side of the screen of an element
 *
 * @params {HTMLElement}
 * @returns {Number} Returns the pixels from the left side of the screen
 */
export function elementOffsetLeft (el) {
  let offset = 0
  while (el) {
    offset += el.offsetLeft
    el = el.offsetParent
  }
  return offset
}

/**
 * Maps the horizontal mouse position on an element
 * to a percentage of the width of the element.
 *
 * @param {MouseEvent} ev
 * @param {HTMLElement} el = ev.target
 * @returns {Number} Returns a number from 0 to 1
 */
export function mousePosTo1 (ev, el = ev.target) {
  let pxPos = ev.clientX - elementOffsetLeft(el)
  return pxPos / el.clientWidth
}

export function chunkSize (count) {
  return Math.floor(1 / count * 10000) / 10000
}
