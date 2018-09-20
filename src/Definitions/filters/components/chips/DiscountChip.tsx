import * as React from 'react';
import { Range } from '../../../../Api';

interface DiscountChipProps {
  query: Range;
}

export default class DiscountChip extends React.Component<DiscountChipProps> {
  static title = (props: DiscountChipProps) => {
    let { query } = props;
    let text = DiscountChip.text(query);
    return `On sale ${text.replace('On sale', '').toLowerCase()}`;
  }

  static text = (query: Range) => {
    let keys = Object.keys(query).length;
    if (query.gt === 0 && keys === 1) {
      return `On sale`;
    } else if (query.gte === 100 && keys === 1) {
      return `Temporarily free!`
    } else if (query.gte != null && keys === 1) {
      return `-${query.gte}%`;
    } else {
      return JSON.stringify(query);
    }
  }

  render () {
    return (
      <span>
        {DiscountChip.text(this.props.query)}
      </span>
    );
  }
}
