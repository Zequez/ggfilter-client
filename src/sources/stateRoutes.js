import StateRouter from 'lib/StateRouter/StateRouter'
import { encode } from 'lib/b64FilterGenerator'

import { setFilterFromB64 } from 'stores/reducers/filterReducer'
import { MODES, setMode } from 'stores/reducers/uiReducer'
import { getFromSid, getFromOfficialSlug } from 'stores/reducers/sFilterReducer'

export default new StateRouter({
  filter:
    ['/', {ui: {mode: MODES.filter}}, setMode(MODES.filter)],
  sysreq:
    ['/system-requirements', {ui: {mode: MODES.sysreq}}, setMode(MODES.sysreq)],
  officialFilters:
    ['/interesting-filters', {ui: {mode: MODES.officialFilters}}, setMode(MODES.officialFilters)],
  feedback:
    ['/feedback', {ui: {mode: MODES.feedback}}, setMode(MODES.feedback)],
  contribute:
    ['/contribute', {ui: {mode: MODES.contribute}}, setMode(MODES.contribute)],
  sources:
    ['/sources', {ui: {mode: MODES.sources}}, setMode(MODES.sources)],

  filterSid: [
    '/f/:filterSid', {
      ui: {mode: MODES.filter},
      sfilter: {data: {sid: ':filterSid'}}
    },
    [setMode(MODES.filter), getFromSid]
  ],
  officialFilter: [
    '/:officialSlug', {
      ui: {mode: MODES.filter},
      sfilter: {data: {officialSlug: ':officialSlug'}}
    },
    [setMode('filter'), getFromOfficialSlug]
  ],
  filterB64: [
    '/b/:filterB64', {
      ui: {mode: MODES.filter},
      sfilter: {data: {dirty: true}}
    },
    [setMode(MODES.filter), setFilterFromB64],
    (state) => ({filterB64: encode(state.filter)})
  ]
})
