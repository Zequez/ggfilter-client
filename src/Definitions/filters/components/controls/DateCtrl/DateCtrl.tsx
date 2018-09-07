import * as React from 'react';
import * as th from './DateCtrl.sass';
import Relative from './Relative';
import Absolute from './Absolute';

type DateCtrlQuery = {
  gte: number | string;
  lte: number | string;
};

type DateCtrlProps = {
  query: DateCtrlQuery;
  onChange: (query: DateCtrlQuery) => void;
};

export class DateCtrl extends React.Component<DateCtrlProps> {
  static defaultQuery: DateCtrlQuery = {
    gte: null,
    lte: null
  };

  onChange = (from: number | string, to: number | string) => {
    this.props.onChange({gte: from, lte: to});
  }

  render () {
    let { query } = this.props;
    let { gte, lte } = this.props.query || DateCtrl.defaultQuery;
    let relative = typeof gte === 'number';
    let rFrom = relative ? gte as number : null;
    let rTo = relative ? lte as number : null;
    let aFrom = !relative ? gte as string : null;
    let aTo = !relative ? lte as string : null;

    return (
      <div className={th.DateCtrl}>
        <Relative backCount={10} from={rFrom} to={rTo} onChange={this.onChange}/>
        <Absolute startYear={1970} from={aFrom} to={aTo} onChange={this.onChange}/>
      </div>
    );
  }
}
