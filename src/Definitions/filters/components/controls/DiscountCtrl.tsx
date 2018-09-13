import * as React from 'react';
import * as th from './DiscountCtrl.sass';
import { Range } from '../../../../Api';
import Picker from 'shared/components/Picker';

type DiscountCtrlProps = {
  query: Range,
  onChange: (query: Range) => void;
};

const SHORTCUTS = {
  'On sale': {gt: 0},
  '≥10%': {gte: 10},
  '≥20%': {gte: 20},
  '≥30%': {gte: 30},
  '≥40%': {gte: 40},
  '≥50%': {gte: 50},
  '≥60%': {gte: 60},
  '≥70%': {gte: 70},
  '≥80%': {gte: 80},
  '≥90%': {gte: 90},
  'FREE STUFF!': {gte: 100}
}

export default class DiscountCtrl extends React.Component<DiscountCtrlProps> {
  render () {
    let { query } =  this.props;
    return (
      <div className={th.DiscountCtrl}>
        {Object.keys(SHORTCUTS).map((text) =>
          <Picker
            key={text}
            text={text}
            value={SHORTCUTS[text]}
            currentValue={query}
            onClick={this.props.onChange}/>
        )}
      </div>
    );
  }
}
