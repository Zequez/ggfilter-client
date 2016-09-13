import router from 'sources/stateRoutes'
import { URLS_TYPES } from 'stores/reducers/filterUrlReducer'

export default function appropiateFilterPath (type, state) {
  switch (type) {
    case URLS_TYPES.b64: return router.url('filterB64')
    case URLS_TYPES.sid: return router.url('filterSid')
    case URLS_TYPES.official: return ''
  }
}
