import router from 'src/app/routes'
import config from 'src/app/config'

function officialPath (sfilter) {
  if (sfilter.officialSlug) {
    return router.url('filterOfficial', sfilter.officialSlug)
  } else {
    return ''
  }
}

function sidPath (sfilter) {
  if (sfilter.sid) {
    return router.url('filterSid', sfilter.sid)
  } else {
    return ''
  }
}

export function appropiateFilterPath (sfilter) {
  return officialPath(sfilter) || sidPath(sfilter)
}

export function appropiateFilterUrl (sfilter) {
  return config.origin + appropiateFilterPath(sfilter)
}
