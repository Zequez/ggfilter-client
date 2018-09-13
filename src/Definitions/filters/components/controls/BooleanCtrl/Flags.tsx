import * as React from 'react';
import * as th from './BooleanCtrl.sass';
import enumColumns from '../../../../enumColumns';

import Checkbox from './Checkbox';

type FlagsProps = {
  value: string[],
  enumType: keyof typeof enumColumns,
  onChange: (value: string[]) => void
};

export default class Flags extends React.Component<FlagsProps> {
  enums = {};
  enumKeys = [];

  componentWillMount () {
    this.enums = enumColumns[this.props.enumType];
    this.enumKeys = Object.keys(this.enums);
  }

  onChange (name, checked) {
    let value = this.props.value.concat([]);
    let valueIndex = value.indexOf(name);
    if (valueIndex !== -1) value.splice(valueIndex, 1);
    if (checked) value.push(name);
    this.props.onChange(value);
  }

  isChecked = (name) => this.props.value.indexOf(name) !== -1

  render () {
    let { enumType } = this.props;

    return (
      <div className={th.BooleanCtrl__Flags}>
        {this.enumKeys.map((name) => (
          <Checkbox
            key={name}
            name={name}
            enumType={enumType}
            value={this.isChecked(name)}
            onChange={this.onChange.bind(this, name)}
          />
        ))}
      </div>
    );
  }
}
