import * as React from 'react';
import * as th from './PlaytimePct.sass';
import * as cx from 'classnames';

import { TTDiv } from 'shared/components/Tooltip';

type PlaytimePctProps = {
  playtime: number;
  playtimePct: number;
  disparity: number;
  disparityPct: number;
  playtimeFtb: number;
  playtimeFtbPct: number;
};

export default class PlaytimePct extends React.Component<PlaytimePctProps, null> {
  render () {
    let { playtime, playtimePct, disparity, disparityPct, playtimeFtb, playtimeFtbPct } = this.props;

    // let disparityLevel = playtime != null ? Math.floor(disparityPct / 10) + 1 : null;
    let disparityLevel, disparityWord;
    if (playtime) {
      disparityLevel = disparityPct < 30 ? 1 : (disparityPct > 70 ? 3 : 2);
      disparityWord = ['Low', 'Regular', 'High'][disparityLevel - 1];
    }


    return (
      playtime != null ? <div className={th.PlaytimePct}>
        <div className={th.Time}>
          <div className={th.bar} style={{width: `${playtimePct + 1}%`}}></div>
          <span>{Math.round(playtime * 10) / 10}</span>
          <span className={th.deco}>hs</span>
        </div>
        <TTDiv
          className={cx(th.Disparity, th[`Disparity_level${disparityLevel}`])}
          tooltip={(Math.round(disparity * 10) / 10).toString() + `hs disparity (${disparityWord})`}>
          <i className='fa'></i>
        </TTDiv>
        {playtimeFtb ? <div className={th.Ftb}>
          <div className={th.bar} style={{width: `${playtimeFtbPct + 1}%`}}></div>
          <span>{Math.round(playtimeFtb * 100) / 100}</span>
          <span className={th.deco}>hs/$</span>
        </div> : <div className={th.Ftb}><span className={th.deco}>N/A</span></div>}
      </div> : <span className={th.deco}>N/A</span>
    );
  }
}
