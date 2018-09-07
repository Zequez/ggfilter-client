import * as React from 'react';
import * as th from './DateCtrl.sass';
import * as cx from 'classnames';

import tooltipFactory from 'shared/components/Tooltip';

const Span = tooltipFactory('span', {position: 'top'}) as any;

interface RelativeProps {
  backCount: number;
  from: number;
  to: number;
  onChange: (from: number, to: number) => void;
};

const DAY = 60 * 60 * 24;
const UNITS = {
  year: DAY * 365,
  month: DAY * 30,
  week: DAY * 7,
  day: DAY
};

function mapUnits (n: number, whole: boolean): [number, keyof typeof UNITS] {
  let unit: keyof typeof UNITS;
  let u: keyof typeof UNITS;
  for (u in UNITS) {
    if (n >= UNITS[u] && (!whole || n % UNITS[u] === 0)) {
      unit = u;
      n = n / UNITS[u];
      break;
    }
  }

  return [n, unit];
}

type State = {
  n: number;
  axis: 'last' | 'next';
  unit: keyof typeof UNITS;
};

export default class Relative extends React.Component<RelativeProps, null> {
  propsToState (): State {
    let { from, to } = this.props;
    if (from == null && to == null) {
      return { n: 1, axis: 'last', unit: null };
    } else {
      let s: State = { axis: null, n: null, unit: null };
      s.axis = to === 0 ? 'last' : 'next';
      s.n = to === 0 ? -from : to;

      [s.n, s.unit] = mapUnits(s.n, true);
      if (!s.unit) [s.n, s.unit] = mapUnits(s.n, false);

      return s;
    }
  }

  stateToProps (deltaState: Partial<State>) {
    let s = {...this.propsToState(), ...deltaState};
    let n = s.n * UNITS[s.unit];
    let from = s.axis === 'last' ? -n : 0;
    let to = s.axis === 'next' ? n : 0;
    this.props.onChange(from, to);
  }

  onChangeNumber = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    this.stateToProps({n: parseInt(ev.target.value)});
  onChangeAxis = (axis: 'next' | 'last') => this.stateToProps({axis});
  onChangeUnit = (unit: keyof typeof UNITS) => this.stateToProps({unit});

  render () {
    let { backCount } = this.props;
    let options = [];
    for (let i = 0; i < backCount; i++) options.push(Option(i + 1));

    let { n, axis, unit } = this.propsToState();

    return (
      <div className={th.Relative}>
        {Picker('Last', null, axis, 'last', this.onChangeAxis)}
        {Picker('Next', null, axis, 'next', this.onChangeAxis)}
        <select onChange={this.onChangeNumber} value={n}>{options}</select>
        {Picker('Y', 'Year', unit, 'year', this.onChangeUnit)}
        {Picker('M', 'Month', unit, 'month', this.onChangeUnit)}
        {Picker('W', 'Week', unit, 'week', this.onChangeUnit)}
        {Picker('D', 'Day', unit, 'day', this.onChangeUnit)}
      </div>
    );
  }
}

const Picker = (text: string, textLong: string, currentVal: string, val: string, onClick: (val: string) => void) =>
  <Span
    tooltip={textLong}
    className={cx(th.picker, {[th.active]: currentVal === val})}
    onClick={() => {if (currentVal !== val) onClick(val); }}>
    {text}
  </Span>;

const Option = (val: number) =>
  <option key={val} value={val}>{val}</option>;
