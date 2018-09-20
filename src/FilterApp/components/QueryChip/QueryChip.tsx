import * as React from 'react';
import * as th from './QueryChip.sass';
import * as cx from 'classnames';
import { FilterConfig } from '../../filter';
import { Filter } from '../../../Definitions';

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
    const chipElement = <ChipComponent
      query={config.query}
      name={filter.name}
      title={filter.title}
      config={filter.chipConfig}/>;
    // const divClassName = cx(th.QueryChip, {
    //   [th.QueryChip_hl]: config.hl
    // });


    let tooltip = '';
    if (filter.chipTitle) {
      tooltip = filter.chipTitle(chipElement.props);
    } else if (ChipComponent['title']) {
      tooltip = ChipComponent['title'](chipElement.props);
    }
    return (
      <TTDiv className={cx(th.QueryChip, {[th._hl]: config.hl})} position='bottom' tooltip={tooltip}>
        <Icon
          icon={'filter-' + filter.name}
          className={th.__Icon}/>
        <span
          className={th.__text}>
          {chipElement}
        </span>
        { onRemove ? (
          <Icon icon='remove-chip' className={th.__remove} onClick={onRemove}/>
        ) : null }
      </TTDiv>
    );
  }
}
