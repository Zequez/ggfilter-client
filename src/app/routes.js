import SelectorRouter from 'shared/lib/SelectorRouter/SelectorRouter'

import { MODES, setMode } from 'shared/reducers/uiReducer'

// TODO: Somehow, don't do this, because we're looking inside FilterApp
// But if we expose this on src/FilterApp, we get a circular reference
// Figure it out.
import { setFilterFromUrl, reset as resetFilters } from 'src/FilterApp/filter/reducer'
// import { getFromSid, getFromOfficialSlug } from 'src/FilterApp/sfilter/reducer'
import { encodedDeltaSelector, sidSelector, isFrontPageFilter } from 'src/FilterApp/filter/selectors'
// import { sfilterSelector, filterIsDirty as sfilterFilterIsDirty } from 'src/FilterApp/sfilter/selectors'

let modeSelector = (s) => s.ui.mode

let mr = (path, mode) => ({
  path: path,
  conditions: (s) => modeSelector(s) === mode,
  actions: () => setMode(mode)
})

// export default new SelectorRouter({
//   sysreq: mr('/system-requirements', MODES.sysreq),
//   // officialFilters: mr('/interesting-filters', MODES.officialFilters),
//   feedback: mr('/feedback', MODES.feedback),
//   contribute: mr('/donations', MODES.contribute),
//   // sources: mr('/sources', MODES.sources),
//   // myFilters: mr('/your-filters', MODES.myFilters),
//   // tos: mr('/tos', MODES.tos),
//   // help: mr('/help', MODES.help),
//   // about: mr('/about', MODES.about),
//   // contact: mr('/contact', MODES.contact),
//   aboutSysreq: mr('/about-sysreq', MODES.aboutSysreq),
//   oculusSandbox: mr('/oculus-sandbox', MODES.oculusSandbox),
//   logs: mr('/logs', MODES.logs),
//
//   filter: {
//     path: '/f(/:sid)',
//     query: {
//       b: '(:encoded)'
//     },
//     selectors: (s) => ({
//       sid: sidSelector(s),
//       encoded: encodedDeltaSelector(s)
//     }),
//
//     actions: (params, location) => (dispatch) => {
//       dispatch(setMode(MODES.filter))
//       return dispatch(setFilterFromUrl(params))
//     },
//     conditions: (s) => (
//       modeSelector(s) === MODES.filter &&
//       isFrontPageFilter(s) === false
//     )
//   },
//   root: {
//     path: '/',
//     actions: (params, location) => (dispatch) => {
//       dispatch(setMode(MODES.filter))
//       return dispatch(resetFilters())
//     },
//     conditions: (s) => (
//       modeSelector(s) === MODES.filter &&
//       isFrontPageFilter(s) === true
//     )
//   },
//   notfound: {
//     redirect: '/'
//   }
// })
