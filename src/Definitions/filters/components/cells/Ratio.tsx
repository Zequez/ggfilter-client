import * as React from 'react';
import * as th from './columns.sass';
import * as cx from 'classnames';

import MicroTag from 'shared/components/MicroTag';
import tooltipFactory from 'shared/components/Tooltip';

const TooltipMicrotag = tooltipFactory(MicroTag, {position: 'left'}) as any;
const TooltipDiv = tooltipFactory('div', {position: 'left'}) as any;

type RatioProps = {
  ratio: number;
  count: number;
};

export default class Ratio extends React.Component<RatioProps> {
  // static noOverflowContainer = true

  render () {
    let { ratio, count } = this.props;
    let tooltip = `${count} reviews, ${ratio}% positive`;

    return (count && ratio) ? (
      <div className={cx(th.Ratio, {
        [th.Ratio_sampleLow]: count && count < 100,
        [th.Ratio_sampleHigh]: count && count > 1000,
        [th.Ratio_noSamples]: count === 0
      })}>
        <TooltipDiv tooltip={tooltip} className={th.Ratio__votesContainer}>
          <div className={th.Ratio__up} style={{ width: `${ratio}%` }}></div>
          <div className={th.Ratio__down} style={{ width: `${100 - ratio}%` }}></div>
        </TooltipDiv>
        <div className={th.Ratio__microTagContainer}>
          <TooltipMicrotag
            className={th.Ratio__MicroTag}
            tag={count}
            deco={ratio + '%'}
            tooltip={tooltip}/>
        </div>
      </div>
    ) : (
      <div className={th.Ratio}>
        <div className={th.Ratio_noData}>No reviews</div>
      </div>
    );
  }
}
