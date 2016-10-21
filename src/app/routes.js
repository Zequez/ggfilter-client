import SelectorRouter from 'shared/lib/SelectorRouter/SelectorRouter'

import { MODES, resetUi, setMode } from 'shared/reducers/uiReducer'

// TODO: Somehow, don't do this, because we're looking inside FilterApp
// But if we expose this on src/FilterApp, we get a circular reference
// Figure it out.
import { setFilterFromB64, reset as resetFilters } from 'src/FilterApp/filter/reducer'
import { getFromSid, getFromOfficialSlug } from 'src/FilterApp/sfilter/reducer'
import { isDirtySelector, encodedFilterSelector } from 'src/FilterApp/filter/selectors'
import { sfilterSelector, filterIsDirty as sfilterFilterIsDirty } from 'src/FilterApp/sfilter/selectors'

let modeSelector = (s) => s.ui.mode

// Mode route
let mr = (path, mode, extraSelect = [], extraActions = []) => ([
  path,
  [[modeSelector, mode], ...extraSelect],
  [setMode(mode), ...extraActions]
])

export default new SelectorRouter({
  sysreq: mr('/system-requirements', MODES.sysreq),
  officialFilters: mr('/interesting-filters', MODES.officialFilters),
  feedback: mr('/feedback', MODES.feedback),
  contribute: mr('/contribute', MODES.contribute),
  sources: mr('/sources', MODES.sources),
  myFilters: mr('/your-filters', MODES.myFilters),
  tos: mr('/tos', MODES.tos),
  help: mr('/help', MODES.help),
  about: mr('/about', MODES.about),
  contact: mr('/contact', MODES.contact),
  aboutSysreq: mr('/about-sysreq', MODES.aboutSysreq),
  // filterOfficial: mr('/:officialSlug', MODES.filter,
  //   [[sfilterFilterIsDirty, false], [sfilterSelector, (sf) => sf.officialSlug]],
  //   [getFromOfficialSlug]
  // ),
  // filterSid: mr('/f/:filterSid', MODES.filter,
  //   [[sfilterFilterIsDirty, false], [sfilterSelector, (sf) => sf.sid]],
  //   [getFromSid]
  // ),
  filterB64: mr('/b/:filterB54', MODES.filter,
    [[isDirtySelector], [encodedFilterSelector]],
    [setFilterFromB64]
  ),
  filter: mr('/', MODES.filter),
  root: ['/', [], [[resetUi], [resetFilters]]]

  // nested: [...mr('/', MODES.potato), {
  //   official: [':/officialSlug',
  //     [[sfilterSelector, (sf) => sf.officialSlug]],
  //     [getFromOfficialSlug]
  //   ],
  //   b64: ['/b/:filterB54',
  //     [[dirtySelector], [encodedFilterSelector]],
  //     [setFilterFromB64]
  //   ],
  //   sid: ['/b/:filterSid',
  //     [[sfilterSelector, (sf) => sf.sid]],
  //     [getFromSid]
  //   ]
  // }]
})
