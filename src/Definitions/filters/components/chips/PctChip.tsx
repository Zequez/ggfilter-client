import * as React from 'react';
import * as th from './chips.sass';
import * as cx from 'classnames';
import api, { Range } from '../../../../Api';

interface PctChipProps {
  query: Range;
  title: string;
  config: {lowerIsBetter: boolean, interpolation: (n: number) => string, apiPercentiles: string};
}

let defaultInterpolation = (v: number) => v.toString();
let apiPercentiles = null;
api.percentiles.index().then((percentiles) => {
  apiPercentiles = percentiles;
});

export default class PctChip extends React.Component<PctChipProps, null> {
  static title = (props: PctChipProps) => {
    let { title, query, config } = props;
    let interpolation = (config && config.interpolation) || defaultInterpolation;
    let gte = query.gte != null;
    let lte = query.lte != null;
    let gtev = gte ? '[' : ')';
    let ltev = lte ? ']' : ')';
    let gt = query.gte || query.gt || 0;
    let lt = query.lte || query.lt || 100;
    let text = `${title} percentiles ${gtev}${gt}, ${lt}${ltev}`;
    if (apiPercentiles) {
      let gtv = interpolation(apiPercentiles[config.apiPercentiles][gt + (gte ? 0 : 1)]);
      let ltv = lt === 100 ? '+' : '-' + interpolation(apiPercentiles[config.apiPercentiles][lt]);
      text += ` ( ${gtv}${ltv} )`;
    }
    return text;
  }

  render () {
    let { query, config } = this.props;
    let lowerIsBetter = !!(config && config.lowerIsBetter);
    let left = (query.gt || query.gte || 0);
    let right = (100 - (query.lt || query.lte || 100));
    let style = {
      clipPath: `inset(0 ${right}% 0 ${left}%)`
    };

    return (
      <div className={cx(th.PctChip, {[th.PctChip_lowerIsBetter]: lowerIsBetter})}>
        <div className={th.PctChip__bar} style={style}></div>
      </div>
    );
  }
}
