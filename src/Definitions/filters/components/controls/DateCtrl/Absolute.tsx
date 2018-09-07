import * as React from 'react';

interface AbsoluteProps {
  from: string;
  to: string;
  startYear: number;
  onChange: (from: string, to: string) => void;
}

export default class Absolute extends React.Component<AbsoluteProps, null> {
  render () {
    return (
      <div>
        From

        to
      </div>
    );
  }
}
