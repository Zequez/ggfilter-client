import * as React from 'react';
import * as th from './columns.sass';
import * as cx from 'classnames';
import tooltipFactory from 'shared/components/Tooltip';

const Tooltipped = tooltipFactory('span', {position: 'left'}) as any;

type SysreqIndexProps = {
  value: number;
};

export default class SysreqIndex extends React.Component<SysreqIndexProps> {
  render () {
    let { value } = this.props;
    let cols = [];
    for (let i = 0; i < 10; ++i) {
      let active = value !== null
        ? (value > i * 10 && value <= (i + 1) * 10)
        : false;

      cols.push(
        <span
          key={i}
          className={cx(th.SysreqIndex__col, {
            [th.SysreqIndex__col_active]: active
          })}>
        </span>
      );
    }

    const className = cx(th.SysreqIndex, {
      [th.SysreqIndex_unknown]: value === null
    });

    let tooltip = value === null ? 'No data' : `${value}nth percentile`;

    return (
      <Tooltipped tooltip={tooltip} className={className}>
        {cols}
      </Tooltipped>
    );
  }
}
