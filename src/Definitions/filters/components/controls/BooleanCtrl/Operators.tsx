import * as React from 'react';
import * as th from './BooleanCtrl.sass';
import * as cx from 'classnames';

import TooltipLabel from './TooltipLabel'

export type Mode = 'and' | 'or' | 'xor';
type OperatorsProps = {
  modes: Mode[];
  value: Mode;
  onChange: (mode: Mode) => void;
};

export default class Operators extends React.Component<OperatorsProps> {
  onClick = () => {
    let { value, modes } = this.props;
    let newMode = modes[modes.indexOf(value) + 1] || modes[0];
    this.props.onChange && this.props.onChange(newMode);
  }

  render () {
    let { modes, value } = this.props;

    let modesTitles = modes.map((m) => m.toUpperCase());
    let tooltip = modesTitles.join('/');

    let className = cx(
      th.BooleanCtrl__Operators,
      th['BooleanCtrl__Operators_' + value]
    );

    let valueIndex = modes.indexOf(value);
    let transform = {
      transform: `translateY(-${100 * valueIndex}%)`
    };

    return (
      <TooltipLabel
        className={className}
        tooltip={tooltip}
        onClick={this.onClick}>
        {modes.map((mode, i) =>
          <span
            key={mode}
            style={transform}
            className={cx(th.BooleanCtrl__Operator, {
              [th.BooleanCtrl__Operator_active]: mode === value
            })}>
            {modesTitles[i]}
          </span>
        )}
      </TooltipLabel>
    )
  }
}
