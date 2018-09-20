import * as React from 'react';
import { Range } from '../../../../Api';
import { queryToText } from '../controls/PriceCtrl/quickParser';

interface PriceChipProps {
  query: Range;
}

export default class PriceChip extends React.Component<PriceChipProps> {
  static title = (query: Range) => {
    let text = PriceChip.text(query)
      .replace(/≤([^\s]+)/, '$1 or less')
      .replace('<', 'less than ')
      .replace(/≥([^\s]+)/, '$1 or more')
      .replace('>', 'more than ')
      .toLowerCase();

    return `For ${text}`;
  }

  static text = (query: Range) => {
    if (query.lte && query.gt === 0) {
      return `≤$${query.lte / 100}`;
    } else if (query.lte && query.gt == null && query.gte == null) {
      return `≤$${query.lte / 100} (including free)`;
    } else if (query.lte && query.gte) {
      return `$${query.gte / 100}-$${query.lte / 100}`;
    } else if (query.lte === 0 && query.gt === 0) {
      return `Free`;
    } else {
      let textQuery = queryToText(query)
        .replace('>=', '≥$')
        .replace('<=', '≤$')
        .replace('<', '<$')
        .replace('>', '>$')
        .replace('=', 'Exactly $');

      return `${textQuery}`;
    }
  }

  render () {
    return (
      <span>
        {PriceChip.text(this.props.query)}
      </span>
    );
  }
}
