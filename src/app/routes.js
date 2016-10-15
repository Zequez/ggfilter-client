import StateRouter from 'shared/lib/StateRouter/StateRouter'
import { encode } from 'shared/lib/b64FilterGenerator'

import { MODES, resetUi, setMode } from 'shared/reducers/uiReducer'

// TODO: Somehow, don't do this, because we're looking inside FilterApp
// But if we expose this on src/FilterApp, we get a circular reference
// Figure it out.
import { setFilterFromB64, resetFilter } from 'src/FilterApp/filter/reducer'
import { getFromSid, getFromOfficialSlug } from 'src/FilterApp/sfilter/reducer'

let basicModeRoute = (path, mode) => {
  return [path, {ui: {mode: mode}}, setMode(mode)]
}

export default new StateRouter({
  sysreq: basicModeRoute('/system-requirements', MODES.sysreq),
  officialFilters: basicModeRoute('/interesting-filters', MODES.officialFilters),
  feedback: basicModeRoute('/feedback', MODES.feedback),
  contribute: basicModeRoute('/contribute', MODES.contribute),
  sources: basicModeRoute('/sources', MODES.sources),
  myFilters: basicModeRoute('/myFilters', MODES.myFilters),
  tos: basicModeRoute('/tos', MODES.tos),
  help: basicModeRoute('/help', MODES.help),
  about: basicModeRoute('/about', MODES.about),
  contact: basicModeRoute('/contact', MODES.contact),

  filterB64: [
    '/b/:filterB64', {
      ui: {mode: MODES.filter},
      sfilter: {dirty: true}
    },
    [setMode(MODES.filter), setFilterFromB64],
    (state) => ({filterB64: encode(state.filter)})
  ],
  filterOfficial: [
    '/:officialSlug', {
      ui: {mode: MODES.filter},
      sfilter: {data: {officialSlug: ':officialSlug'}}
    },
    [setMode(MODES.filter), getFromOfficialSlug]
  ],
  filterSid: [
    '/f/:filterSid', {
      ui: {mode: MODES.filter},
      sfilter: {data: {sid: ':filterSid'}}
    },
    [setMode(MODES.filter), getFromSid]
  ],
  filter:
    ['/', {ui: {mode: MODES.filter}}, setMode(MODES.filter)],
  root:
    ['/', {no: 'match'}, [resetUi, resetFilter]]
})
