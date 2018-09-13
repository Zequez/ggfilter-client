import * as React from 'react';
import * as th from './columns.sass';
import * as cx from 'classnames';
import enumColumns from '../../../enumColumns';
import Icon from 'shared/components/Icon';
import tooltipFactory from 'shared/components/Tooltip';

const TooltipIcon = tooltipFactory(Icon, { position: 'top' }) as any;

type BooleanCellProps = {
  value: string[];
  name: keyof typeof enumColumns;
};

export default class BooleanCell extends React.Component<BooleanCellProps> {
  render () {
    let { name, value } = this.props;
    let names = enumColumns[name];
    let keys = Object.keys(names);

    return (
      <div className={th.Boolean}>
        {keys.map((k) => (
          <TooltipIcon
            tooltip={names[k]}
            key={k}
            icon={`boolean-${name}-${k}`}
            className={cx(
              th.Boolean__Icon, {
                [th.Boolean__Icon_disabled]: !value || value.indexOf(k) === -1
              })
            }
          />
        ))}
      </div>
    );
  }
}
