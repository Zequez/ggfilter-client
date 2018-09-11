import * as React from 'react';
import * as th from './RatingsPct.sass';
import * as cx from 'classnames';

export const getCurrentColumn = (divisions, pct) => {
  return Math.floor(pct / (100 / divisions));
};

type PercentilesProps = {
  divisions: number;
  pct: number;
};

export default class Percentiles extends React.Component<PercentilesProps> {
  render () {
    let { divisions, pct } = this.props;

    let currentColumn = getCurrentColumn(divisions, pct);
    let cols = [];
    for (let i = 0; i < divisions; ++i) {
      cols.push(
        <div key={i} className={cx(th.__entil, {
          [th.__entil_current]: currentColumn === i
        })}></div>
      );
    }

    return (
      <div className={th.__Percentiles}>
        {cols}
      </div>
    );
  }
}
