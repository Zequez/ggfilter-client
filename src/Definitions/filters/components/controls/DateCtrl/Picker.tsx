import * as React from 'react';
import * as th from './DateCtrl.sass';
import * as cx from 'classnames';

import tooltipFactory from 'shared/components/Tooltip';

const Span = tooltipFactory('span', {position: 'top'}) as any;

const Picker = (text: string, textLong: string, currentVal: string, val: string, onClick: (val: string) => void) =>
  <Span
    key={text}
    tooltip={textLong}
    className={cx(th.picker, {[th.active]: currentVal === val})}
    onClick={() => {if (currentVal !== val) onClick(val); }}>
    {text}
  </Span>;

export default Picker;
