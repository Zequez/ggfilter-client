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
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class Absolute extends React.Component<AbsoluteProps, null> {
  propsToState (): State {
    let { from, to } = this.props;

    let [fromY, fromM] = from && from.split('-') || ['', ''];
    if (from === to) to = '';
    let [toY] = to && to.split('-') || [''];

    return { fromY, fromM, toY };
  }

  onChange (deltaState: Partial<State>) {
    let { fromY, fromM, toY } = {...this.propsToState(), ...deltaState} as State;

    if (!fromY) {
      toY = '';
      fromM = '';
    } else if (toY && parseInt(fromY) > parseInt(toY)) {
      toY = '';
    }

    let from = fromY + (fromM ? '-' + fromM : '');

    this.props.onChange(from || null, toY || from || null);
  }

  options = {
    years: (bottom?: string) => {
      let lastYear = new Date().getFullYear() + 1;
      let years = [['', 'Year']];
      for (let i = lastYear; i >= this.props.startYear; --i) {
        years.push([i.toString(), i.toString()]);
      }
      if (bottom) years = years.slice(0, years.findIndex((y) => y[0] === bottom));
      return years.length > 1 ? years : null;
    },
    months: () => {
      let months = [['', '']];
      for (let i = 1; i <= 12; ++i) months.push([i.toString(), MONTHS[i - 1]]);
      return months;
    }
  };

  shortcutsYears = () => {
    let year = new Date().getFullYear();
    return [(year - 1).toString(), year.toString()];
  }

  render () {
    let { fromY, fromM, toY } = this.propsToState();
    let fromYears = this.options.years();
    let fromMonths = fromY && !toY && this.options.months();
    let toYears = fromY && !fromM && this.options.years(fromY);
    // let toMonths = toY && this.options.months(fromY === toY ? fromM : '');

    let shortcutYears = this.shortcutsYears();

    return (
      <div className={th.Absolute}>
        {shortcutYears.map((year) => Picker(year, '', fromY, year, (fromY) => this.onChange({fromY})))}
        <span>From</span>
        {Selector(fromY, fromYears, (fromY) => this.onChange({fromY}))}
        {fromMonths && Selector(fromM, fromMonths, (fromM) => this.onChange({fromM}))}
        {toYears && <span>to</span>}
        {toYears && Selector(toY, toYears, (toY) => this.onChange({toY}))}
        {/* {toMonths && Selector(toM, toMonths, (toM) => this.onChange({toM}))} */}
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
