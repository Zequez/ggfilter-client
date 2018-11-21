import React from 'react';
import { connect } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';

import { Main as FilterApp } from 'src/FilterApp';
import { SysreqCalc } from 'src/SysreqCalc';
import * as staticPage from '../StaticPages';

const Pages = {
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

function Root({route}) {
  const { params, name } = route;
  return Pages[name](params);
}

export default connect(createRouteNodeSelector(''))(Root);
