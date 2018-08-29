import * as React from 'react';
import * as cx from 'classnames';
import * as th from './Control.sass';
import { FilterConfig } from '../../../filter/initialState';
import { Filter } from '../../../../Definitions';

interface ControlProps {
  filter: Filter;
  config: FilterConfig;
  onQueryChange: (query: {} | null) => void;
  onVisibilityChange: (visibility: boolean) => void;
  onHlChange: (hl: boolean) => void;
}

function iff (cond) { return cond ? true : null; }

export default class Control extends React.Component<ControlProps> {
  render () {
    let { filter, config } = this.props;

    const Widget = filter.control;
    const widgetProps = {
      query: config.query ? config.query : undefined,
      name: filter.name,
      onChange: this.props.onQueryChange
    };

    return <div className={th.Control}>
      <div className={th.Title}>
        {filter.title}
        <div className={th.Icons}>
          {iff(filter.cell) && <i className={cx('fa', th.IconVisible, { [th.IconVisible_active]: config.column })}/>}
          <i className={cx('fa', th.IconFilterHl, {
            [th.IconFilterHl_active]: !!config.query,
            [th.IconFilterHl_hl]: config.hl
          })}/>
          {iff(filter.fineTune) && <i className={cx('fa', th.IconFineTune)}/>}
          {iff(config.query) && <i className={cx('fa', th.IconClear)}/>}
        </div>
      </div>
      {iff(filter.control) &&
        <div className={th.Widget}>
          <Widget {...widgetProps}/>
        </div>}
    </div>;
  }
}
