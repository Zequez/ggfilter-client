import * as React from 'react';
import * as th from './Picker.sass';
import * as cx from 'classnames';

import tooltipFactory from 'shared/components/Tooltip';

const Span = tooltipFactory('span', {position: 'top'}) as any;

type PickerProps<T> = {
  text: string;
  tooltip?: string;
  value: T;
  currentValue?: T;
  onClick: (value: T) => void;
};

export default class Picker<T> extends React.Component<PickerProps<T>> {
  render () {
    let { text, tooltip, value, currentValue, onClick } = this.props;
    let active = currentValue && JSON.stringify(currentValue) === JSON.stringify(value);
    return <Span
      tooltip={tooltip}
      className={cx(th.Picker, {[th.active]: active})}
      onClick={() => {if (!active) onClick(value); }}>
      {text}
    </Span>;
  }
}
