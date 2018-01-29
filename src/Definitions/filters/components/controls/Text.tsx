import * as React from 'react';
import * as th from './Text.sass';
import Input from 'shared/components/Input';

type QueryType = {
  value: string
};

type PropTypes = {
  query: QueryType,
  onChange: (query: QueryType) => void
};

export class Text extends React.Component<PropTypes, null> {
  onChange = (value) => {
    this.props.onChange({value: value});
  }

  render() {
    return (
      <div className={th.Text}>
        <Input
          onChange={this.onChange}
          hint='Search games by name'/>
      </div>
    );
  }
}
