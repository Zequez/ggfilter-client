import * as React from 'react';

type PropTypes = {
  value: string | number | null ,
  config?: { na: string }
};

export class Raw extends React.Component<PropTypes, null> {
  static defaultProps = {
    config: {
      na: 'N/A'
    }
  };

  render() {
    let { value, config } = this.props;
    return <div>
      {value == null ? config.na : value.toString()}
    </div>;
  }
}
