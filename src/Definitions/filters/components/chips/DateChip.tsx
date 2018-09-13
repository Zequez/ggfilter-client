import * as React from 'react';
import { timeInWords } from 'shared/lib/utils/date';
import {
  formatShortDate as format,
  isFirstDayOfTheYear as isFD
} from 'shared/lib/utils/date';

const year = (date) => date.getUTCFullYear();

type Query = {lte: number | string, gte: number | string};
type DateChipProps = {
  query: Query;
};

export default class DateChip extends React.Component<DateChipProps> {
  static text = (query: Query) => {
    let { gte, lte } = query;
    if (typeof gte === 'number' || typeof lte === 'number') {
      if (lte === 0 && gte != null) {
        return `Last ${timeInWords(-gte, false)}`;
      } else if (gte === 0 && lte !== 0) {
        return `Next ${timeInWords(lte, false)}`;
      } else if (lte != null && gte == null) {
        return `Older than ${timeInWords(lte)}`;
      } else if (lte != null && gte != null) {
        return `Between ${timeInWords(gte)} and ${timeInWords(lte)} ago`;
      }
    } else {
      // let gtd, ltd: Date;
      // if (gte != null) gtd = new Date(gte * 1000);
      // if (lte != null) ltd = new Date(lte * 1000);

      // if (gte != null && lte == null) {
      //   return isFD(gte)
      //     ? `≥ ${year(gtd)}`
      //     : `After ${format(gtd)}`;
      // } else if (lte != null && gte == null) {
      //   return isFD(ltd)
      //     ? `≤ ${year(ltd) - 1}`
      //     : `Before ${format(ltd)}`;
      // } else if (lte != null && gte != null) {
      //   return isFD(gtd) && isFD(ltd)
      //     ? (year(gtd) === year(ltd) - 1 ? year(gtd) : `${year(gtd)}-${year(ltd) - 1}`)
      //     : `Between ${format(gtd)} and ${format(ltd)}`;
      // }
    }
  }

  render () {
    return <div>{DateChip.text(this.props.query)}</div>
  }
}
