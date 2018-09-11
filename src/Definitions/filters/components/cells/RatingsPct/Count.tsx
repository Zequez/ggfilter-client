import * as React from 'react';
import * as th from './RatingsPct.sass';

export default ({count}: {count: number}) =>
  <div className={th.__Count}>{count}</div>;
