import * as React from 'react';
import * as th from './DateCtrl.sass';
import Picker from './Picker';

type AbsoluteProps = {
  from: string;
  to: string;
  startYear: number;
  onChange: (from: string, to: string) => void;
};

type State = {
  fromY: string;
  fromM: string;
  toY: string;
  toM: string;
};

export default class Absolute extends React.Component<AbsoluteProps, null> {
  propsToState (): State {
    let { from, to } = this.props;

    let [fromY, fromM] = from && from.split('-') || ['', ''];
    if (from === to) to = '';
    let [toY, toM] = to && to.split('-') || ['', ''];

    return { fromY, fromM, toY, toM };
  }

  onChange (deltaState: Partial<State>) {
    let { fromY, fromM, toY, toM } = {...this.propsToState(), ...deltaState} as State;

    if (!fromY) toY = '';
    if (!fromM) toM = '';

    if (fromY && toY) {
      if (parseInt(fromY) > parseInt(toY)) {
        toY = '';
        toM = '';
      } else if (fromY === toY && fromM && toM) {
        if (parseInt(fromM) >= parseInt(toM)) {
          toM = '';
          // toM = fromM === '12' ? '' : (parseInt(fromM) + 1).toString();
        }
      }
    }

    if (!toY) toM = '';
    if (!fromY) fromM = '';

    let from = [fromY, fromM].filter((v) => !!v).join('-');
    let to = [toY, toM].filter((v) => !!v).join('-');
    if (!to) to = from;

    this.props.onChange(from, to);
  }

  options = {
    years: (bottom?: string) => {
      let lastYear = new Date().getFullYear() + 1;
      let years = [['', 'Year']];
      for (let i = lastYear; i >= this.props.startYear; --i) {
        years.push([i.toString(), i.toString()]);
      }
      if (bottom) years = years.slice(0, years.findIndex((y) => y[0] === bottom) + 1);
      return years.length > 1 ? years : null;
    },
    months: (bottom?: string) => {
      let months = [];
      let countFrom = bottom ? parseInt(bottom) + 1 : 1;
      for (let i = countFrom; i <= 12; ++i) months.push([i.toString(), i.toString()]);

      // if (bottom) months = months.slice(months.findIndex((m) => m[0] === bottom) + 1);

      months.unshift(['', '']);

      return months.length > 1 ? months : null;
    }
  };

  shortcutsYears = () => {
    let year = new Date().getFullYear();
    return [(year - 1).toString(), year.toString()];
  }

  render () {
    let { fromY, fromM, toY, toM } = this.propsToState();
    let fromYears = this.options.years();
    let fromMonths = fromY && this.options.months();
    let toYears = fromY && this.options.years(fromY);
    let toMonths = toY && this.options.months(fromY === toY ? fromM : '');

    let shortcutYears = this.shortcutsYears();

    return (
      <div className={th.Absolute}>
        {shortcutYears.map((year) => Picker(year, '', fromY, year, (fromY) => this.onChange({fromY})))}
        <span>From</span>
        {Selector(fromY, fromYears, (fromY) => this.onChange({fromY}))}
        {fromY && Selector(fromM, fromMonths, (fromM) => this.onChange({fromM}))}
        {toYears && <span>to</span>}
        {toYears && Selector(toY, toYears, (toY) => this.onChange({toY}))}
        {toMonths && Selector(toM, toMonths, (toM) => this.onChange({toM}))}
      </div>
    );
  }
}

type Options = [string, string][];

const Selector = (value: string, values: any[], onChange: (value: string) => void) =>
  <select onChange={(ev) => onChange(ev.target.value)} value={value}>
    {values.map((v) => v.constructor === Array ? Option(v[0], v[1]) : Option(v))}
  </select>;

const Option = (v1: string, v2?: string) => <option key={v1} value={v1}>{v2 || v1}</option>;
