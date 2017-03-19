import React from 'react'
import {
  FilterAppPage,
  RedirectToCurrentFilter
} from 'src/FilterApp'
import { SysreqCalc } from 'src/SysreqCalc'
import * as staticPage from '../StaticPages'

export default {
  root: () => <FilterAppPage/>,
  filterSid: ({sid}) => <FilterAppPage sid={sid}/>,
  filterFull: ({sid, slug}) => <FilterAppPage sid={sid} slug={slug}/>,
  filterRedirect: () => <RedirectToCurrentFilter/>,
  sysreq: () => <SysreqCalc/>,

  aboutSysreq: () => <staticPage.aboutSysreq/>,
  logs: () => <staticPage.logs/>,
  sources: () => <staticPage.sources/>,
  feedback: () => <staticPage.feedback/>,
  donations: () => <staticPage.contribute/>
}
