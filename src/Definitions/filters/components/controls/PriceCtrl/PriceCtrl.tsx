import * as React from 'react';
import * as th from './PriceCtrl.sass';
import { Range } from '../../../../../Api';
import Picker from 'shared/components/Picker';
import Input from 'shared/components/Input';
import { textToQuery, queryToText } from './quickParser';


type PriceCtrlProps = {
  query: Range,
  onChange: (query: Range) => void;
};

type PriceCtrlState = {
  quickInputValue: string;
};

export default class PriceCtrl extends React.Component<PriceCtrlProps, PriceCtrlState> {
  state = {
    quickInputValue: ''
  };

  componentWillReceiveProps (np) {
    if (np.query !== this.props.query) {
      this.setState({quickInputValue: queryToText(np.query)});
    }
  }

  setLessThan = (val: number) => {
    let query = this.props.query ? {...this.props.query} : {};
    query.lte = val;
    this.props.onChange(query);
  }

  setQuickInput = (quickInputValue: string) => {
    this.setState({quickInputValue});
  }

  onQuickInputBlur = () => {
    this.props.onChange(textToQuery(this.state.quickInputValue));
  }

  onChangeFree = (ev) => {
    let query = this.props.query ? {...this.props.query} : {};
    if (ev.target.checked) {
      query.gt = 0;
    } else {
      delete query.gt;
    }

    this.props.onChange(query);
  }

  render () {
    let lte = this.props.query && this.props.query.lte;
    let gt = this.props.query && this.props.query.gt;

    return (
      <div className={th.PriceCtrl}>
        <div className={th.shortcuts}>
          <Picker text='Free' value={0} currentValue={lte} onClick={this.setLessThan}/>
          <Picker text='≤$5' value={500} currentValue={lte} onClick={this.setLessThan}/>
          <Picker text='≤$10' value={1000} currentValue={lte} onClick={this.setLessThan}/>
          <Picker text='≤$20' value={2000} currentValue={lte} onClick={this.setLessThan}/>
          <Picker text='≤$30' value={3000} currentValue={lte} onClick={this.setLessThan}/>
        </div>
        <div className={th.others}>
          <div className={th.input}>
            <Input value={this.state.quickInputValue} onChange={this.setQuickInput} onBlur={this.onQuickInputBlur}/>
          </div>
          <div className={th.freeExclusion}>
            <label>
              <input type='checkbox' checked={gt === 0} onChange={this.onChangeFree}/> Exclude free games
            </label>
          </div>
        </div>
      </div>
    );
  }
}
