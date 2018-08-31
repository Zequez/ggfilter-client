import React from 'react'
import { Main as FilterApp } from 'src/FilterApp'
import { SysreqCalc } from 'src/SysreqCalc'
import * as staticPage from '../StaticPages'

export default {
  root: () => <FilterApp/>,
  filterSid: ({sid}) => <FilterApp sid={sid}/>,
  filterFull: ({sid, slug}) => <FilterApp sid={sid} slug={slug}/>,
  // filterRedirect: () => <RedirectToCurrentFilter/>,
  filterRedirect: () => <div></div>,
  sysreq: () => <SysreqCalc/>,

  aboutSysreq: () => <staticPage.aboutSysreq/>,
  logs: () => <staticPage.logs/>,
  sources: () => <staticPage.sources/>,
  feedback: () => <staticPage.feedback/>,
  donations: () => <staticPage.contribute/>
}
