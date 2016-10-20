import router from 'src/app/routes'
import config from 'src/app/config'

export const officialPath = (sfilter) => {
  if (sfilter.officialSlug) {
    return router.url('filterOfficial', sfilter.officialSlug)
  } else {
    return ''
  }
}

export const official = (sfilter) => {
  let path = officialPath(sfilter)
  return path && (config.origin + path)
}

export const sidPath = (sfilter) => {
  if (sfilter.sid) {
    return router.url('filterSid', sfilter.sid)
  } else {
    return ''
  }
}

export const sid = (sfilter) => {
  let path = sidPath(sfilter)
  return path && (config.origin + path)
}

export const b64Path = (encoded) => {
  if (encoded) {
    return router.url('filterB64', encoded)
  } else {
    return ''
  }
}

export const b64 = (encoded) => {
  let path = b64Path(encoded)
  return path && (config.origin + path)
}

export const appropiatePath = (sfilter, encoded) => {
  return officialPath(sfilter) || sidPath(sfilter) || b64Path(encoded)
}

export const appropiate = (sfilter, encoded) => {
  return official(sfilter) || sid(sfilter) || b64(encoded)
}
