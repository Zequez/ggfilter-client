import router from 'sources/stateRoutes'
import config from 'sources/config'
import { encode } from 'shared/lib/b64FilterGenerator'

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

function b64Path (sfilter) {
  return config.origin + router.url('filterB64', encode(sfilter))
}

export function appropiateFilterPath (sfilter) {
  return officialPath(sfilter) || sidPath(sfilter) || b64Path(sfilter)
}

export function appropiateFilterUrl (sfilter) {
  return config.origin + appropiateFilterPath(sfilter)
}
