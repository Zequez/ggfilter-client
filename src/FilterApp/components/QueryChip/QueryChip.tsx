import * as React from 'react';
import * as th from './QueryChip.sass';
import * as cx from 'classnames';
import { FilterConfig } from '../../filter';
import { Filter } from '../../../Definitions';
import { capitalizeFirstLetter } from 'shared/lib/utils';
import generateQueryTitle from '../../lib/generateQueryTitle';

import Icon from 'shared/components/Icon';
import { TTDiv } from 'shared/components/Tooltip';

interface QueryChipProps {
  config: FilterConfig;
  filter: Filter;
  onRemove: () => void;
}

export default class QueryChip extends React.Component<QueryChipProps> {
  static defaultProps = {
    icon: true,
    tooltipPre: true
  };

  render () {
    const { config, filter, onRemove } = this.props;

    // const { query, control, icon, onRemove,
    //         children, onClick, className, tooltipPre, hl } = this.props

    const ChipComponent = filter.chip;
    // const divClassName = cx(th.QueryChip, {
    //   [th.QueryChip_hl]: config.hl
    // });

    // let tooltip = capitalizeFirstLetter(generateQueryTitle(control, query));
    let tooltip = '';
    if (filter.chipTitle) {
      tooltip = filter.chipTitle(config.query, filter.title, filter.title);
    } else if (ChipComponent['title']) {
      tooltip = ChipComponent['title'](config.query, filter.name, filter.title);
    }
    // if (tooltipPre) {
    //   tooltip = hl ? 'Highlighting: ' : 'Filtering by: ' + tooltip
    // }

    return (
      <TTDiv className={cx(th.QueryChip, {[th._hl]: config.hl})} position='bottom' tooltip={tooltip}>
        <Icon
          icon={'filter-' + filter.name}
          className={th.__Icon}/>
        <span
          className={th.__text}>
          <ChipComponent query={config.query} name={filter.name}/>
        </span>
        { onRemove ? (
          <Icon icon='remove-chip' className={th.__remove} onClick={onRemove}/>
        ) : null }
      </TTDiv>
    );
  }
}
