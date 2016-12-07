const defaultOptions = {
  '': '{v}',
  '*-*': '{si} to {ei}',
  '*->': '≥{si}',
  '<-*': '≤{ei}',
  '<->': 'Any'
}

export default function rangeInterpolation ({gt, lt}, options) {
  const interpolations = {...defaultOptions, ...options}

  let inte =
    (gt == null && lt == null && interpolations['<->']) ||
    (gt === lt && (interpolations[gt] || interpolations[''])) ||
    interpolations[`${gt}-${lt}`] ||
    (lt != null && interpolations[`${gt}-*`]) ||
    (gt != null && interpolations[`*-${lt}`]) ||
    (gt == null && lt != null && (interpolations[`<-${lt}`] || interpolations['<-*'])) ||
    (gt != null && lt == null && (interpolations[`${gt}->`] || interpolations['*->'])) ||
    (gt != null && lt != null && interpolations['*-*']) ||
    '{s}-{e}'

  let preInt = interpolations['']
  let preInterpolate = (v) =>
    interpolations[v] || (preInt.call ? preInt(v) : preInt.replace('{v}', v))

  if (inte.call) {
    return inte === preInt
      ? inte(gt, lt)
      : inte(gt, lt, preInterpolate(gt), preInterpolate(lt))
  } else {
    return inte
      .replace('{v}', gt)
      .replace('{s}', gt)
      .replace('{e}', lt)
      .replace('{si}', () => preInterpolate(gt))
      .replace('{ei}', () => preInterpolate(lt))
  }
}
