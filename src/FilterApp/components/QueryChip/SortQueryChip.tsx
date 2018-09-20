import * as React from 'react';
import * as th from './QueryChip.sass';
import * as cx from 'classnames';
import Icon from 'shared/components/Icon';
import { TTDiv } from 'shared/components/Tooltip';

interface SortQueryChipProps {
  title: string;
  asc: boolean;
}

export default class SortQueryChip extends React.Component<SortQueryChipProps, null> {
  render () {
    let {title, asc} = this.props;
    return (
      <TTDiv className={cx(th.QueryChip, th.QueryChip_sort)} tooltip={`Sorted by ${title} in ${asc ? 'ascending' : 'descending'} order`} position='bottom'>
        <Icon icon={'sort-chip-' + (asc ? 'asc' : 'desc')} className={th.__Icon}/>
        <span className={th.__text}>{title}</span>
      </TTDiv>
    );
  }
}
