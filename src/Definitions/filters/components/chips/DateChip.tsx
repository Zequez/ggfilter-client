import * as React from 'react';
import { timeInWords } from 'shared/lib/utils/date';
import {
  formatShortDate as format,
  isFirstDayOfTheYear as isFD,
  MONTHS
} from 'shared/lib/utils/date';

const year = (date) => date.getUTCFullYear();

type Query = {lte: number | string, gte: number | string};
type DateChipProps = {
  query: Query;
};

export default class DateChip extends React.Component<DateChipProps> {
  static title = (query: Query) => {
    return `Released ${DateChip.text(query).toLowerCase()}`;
  }

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
    } else if (typeof gte === 'string' || typeof lte === 'string') {
      if (gte != null && lte == null) {
        return `After ${gte}`;
      } else if (lte != null && gte == null) {
        return `Before ${lte}`;
      } else if (gte === lte) {
        let [year, month] = gte.split('-');
        if (month) return `On ${MONTHS[parseInt(month) - 1]} ${year}`;
        else return `On ${gte}`;
      } else {
        return `Between ${gte} and ${lte}`;
      }
    }
  }

  render () {
    return <div>{DateChip.text(this.props.query)}</div>
  }
}
