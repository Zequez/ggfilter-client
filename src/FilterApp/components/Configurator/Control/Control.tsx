import * as React from 'react';
import * as cx from 'classnames';
import * as th from './Control.sass';
import { FilterConfig } from '../../../filter';
import { Filter } from '../../../../Definitions';
import ToggleIcon from './ToggleIcon';
import Toggle from '../../../../Definitions/filters/components/controls/Toggle';

interface ControlProps {
  filter: Filter;
  config: FilterConfig;
  onQueryChange: (query: {} | null) => void;
  onColumnChange: (column: boolean) => void;
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

    return <div className={cx(th.Control, {[th.Control_active]: !!config.query})}>
      <div className={th.Title}>
        {filter.title}
        <div className={th.Icons}>
          <ToggleIcon
            iff={!!filter.cell}
            icon='Column'
            value={config.column}
            onToggle={this.props.onColumnChange}/>
          <ToggleIcon
            icon={config.hl ? 'Hl' : 'Filter'}
            value={config.hl}
            active={!!config.query}
            onToggle={this.props.onHlChange}/>
          <ToggleIcon
            iff={!!config.query}
            icon='Clear'
            value={!!config.query}
            onToggle={() => this.props.onQueryChange(null)}/>
        </div>
      </div>
      {iff(filter.control) &&
        <div className={th.Widget}>
          <Widget {...widgetProps}/>
        </div>}
    </div>;
  }
}
