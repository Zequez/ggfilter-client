import * as React from 'react';
import * as th from './RatingsPct.sass';

import { TTDiv } from 'shared/components/Tooltip';
import Count from './Count';
import Ratio from './Ratio';
import Percentiles from './Percentiles';

type RatingsPctProps = {
  ratio_pct: number;
  count: number;
  count_pct: number;
  ratio: number;
};

export default class RatingsPct extends React.Component<RatingsPctProps> {
  render () {
    let { ratio_pct, count, ratio } = this.props;
    let tooltip = `${count} ratings, ${ratio}% positive, top ${ratio_pct}th percentiles average`;

    return (
      <TTDiv className={th.RatingsPct} tooltip={tooltip}>
        <Count count={count}/>
        <div className={th.__bars}>
          <Percentiles divisions={10} pct={ratio_pct}/>
          <Ratio ratio={ratio}/>
        </div>
      </TTDiv>
    );
  }
}
