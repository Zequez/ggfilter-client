import * as React from 'react';
import * as th from './RatingsPct.sass';

type RatioProps = {
  ratio: number;
};

export default class Ratio extends React.Component<RatioProps> {
  render () {
    let { ratio } = this.props;
    let positiveWidth = {
      width: `${ratio}%`
    };

    return (
      <div className={th.__Ratio} title={`${ratio}% positive`}>
        <div className={th.__ratioPositive} style={positiveWidth}></div>
      </div>
    );
  }
}
