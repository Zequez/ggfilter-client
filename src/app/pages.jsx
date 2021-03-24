import React from 'react';
import { connect } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';

import { FilterAppPage, RedirectToCurrentFilter } from 'src/FilterApp';
import { FrontPage } from 'src/FrontPage';
import { SysreqCalc } from 'src/SysreqCalc';
import * as staticPage from '../StaticPages';


const Pages = {
  root: () => <FrontPage/>,
  filterSid: ({sid}) => <FilterAppPage sid={sid}/>,
  filterFull: ({sid, slug}) => <FilterAppPage sid={sid} slug={slug}/>,
  filterPlain: () => <FilterAppPage/>,
  sysreq: () => <SysreqCalc/>,

  aboutSysreq: () => <staticPage.aboutSysreq/>,
  logs: () => <staticPage.logs/>,
  sources: () => <staticPage.sources/>,
  feedback: () => <staticPage.feedback/>,
}

function Root({route}) {
  const { params, name } = route;
  return Pages[name](params);
}

export default connect(createRouteNodeSelector(''))(Root);
