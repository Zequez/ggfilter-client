import SavedFiltersManager from './components/SavedFiltersManager'
import SavedFiltersManagerGlued from './components/SavedFiltersManagerGlued'

import * as constants from './constants'
import reducer from './reducer'

module.exports = { reducer, constants, SavedFiltersManager, SavedFiltersManagerGlued }

// TODO: When you delete a filter that is the current filter it doesn't signal-up
// the deletion (why should it?) and a deleted filter is still loaded
// Solution: We need to create a normalized sfilter reducer
