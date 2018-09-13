import * as React from 'react';
import * as th from './BooleanCtrl.sass';
import { Boolean } from '../../../../../Api';
import enumColumns from '../../../../enumColumns';

import Operators, { Mode } from './Operators';
import Flags from './Flags';

type BooleanCtrlProps = {
  query: Boolean,
  name: keyof typeof enumColumns,
  onChange: (query: Boolean) => void,
  config: {modes: Mode[]}
};

type BooleanCtrlState = {
  query: Boolean;
};

export default class BooleanCtrl extends React.Component<BooleanCtrlProps, BooleanCtrlState> {
  static defaultProps: Partial<BooleanCtrlProps> = {
    config: { modes: ['and', 'or', 'xor'] }
  };

  state: BooleanCtrlState  = { query: null };
  componentWillMount () {
    this.componentWillUpdate(this.props);
  }

  componentWillUpdate (np) {
    if (!this.state.query || np.query !== this.props.query) {
      let query = np.query || {
        value: 0,
        mode: this.props.config.modes[0]
      };
      this.setState({query});
    }
  }

  onOperatorChange = (mode) => this.setQuery({...this.state.query, mode});
  onFlagsChange = (value) => this.setQuery({...this.state.query, value});

  setQuery (query) {
    this.setState({query});
    if (query.value) {
      this.props.onChange(query);
    } else {
      this.props.onChange(null);
    }
  }

  render () {
    let { name } = this.props;
    let { query } = this.state;

    return (
      <div className={th.BooleanCtrl}>
        <Flags
          enumType={name}
          value={query.value || []}
          onChange={this.onFlagsChange}/>
        <Operators
          modes={this.props.config.modes}
          value={query.mode}
          onChange={this.onOperatorChange}/>
      </div>
    );
  }
}
