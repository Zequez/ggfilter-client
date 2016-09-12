import StateRouter from 'lib/StateRouter/StateRouter'
import { encode } from 'lib/urlificator'

import { setMode, MODES } from 'stores/reducers/modeReducer'
import { setFilterFromB64 } from 'stores/reducers/filterReducer'
import { URLS_TYPES } from 'stores/reducers/filterUrlReducer'

export default new StateRouter({
  columns: ['/', {mode: 'columns'}, setMode(MODES.columns)],
  sources: ['/sources', {mode: 'sources'}, setMode(MODES.sources)],
  share: ['/share', {mode: 'share'}, setMode(MODES.share)],
  sysreq: ['/system-requirements', {mode: 'sysreq'}, setMode(MODES.sysreq)],
  // filterSid: [
  //   '/f/:filterSid', {
  //     mode: 'filter',
  //     filterUrl: {type: 'sid', sid: ':filterSid'}
  //   },
  //   [setMode('filter'), setFilterFromSid]
  // ],
  filterB64: [
    '/b/:filterB64', {
      mode: 'filter',
      filterUrl: {type: URLS_TYPES.b64}
    },
    [setMode(MODES.filter), setFilterFromB64],
    (state) => ({filterB64: encode(state.filter)})
  ]
  // filterName: [
  //   '/:filterName', {
  //     mode: 'filter',
  //     filterUrl: {type: 'official', name: ':filterName'}
  //   },
  //   [setMode('filter'), setFilterFromName]
  // ]
})
