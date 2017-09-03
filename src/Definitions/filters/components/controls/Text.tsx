import * as React from 'react';

type QueryType = {
  value: string
};

type PropTypes = {
  query: QueryType,
  onChange: (query: QueryType) => void
};

export class Text extends React.Component<PropTypes, null> {
  onChange = (ev: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange({value: ev.currentTarget.value});
  }

  render() {
    return <input type='text' onChange={this.onChange}/>;
  }
}
