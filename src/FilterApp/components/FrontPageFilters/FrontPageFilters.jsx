import th from './FrontPageFilters.sass'
import React from 'react'

export default class FrontPageFilters extends React.Component {
  static propTypes = {

  }

  render () {
    return (
      <div className={th.FrontPageFilters}>
        {/*<h3>Here are some pre-made filters you can try</h3>*/}
        <ul className={th.__Cards}>
          <li className={th.__Card}>On Sale</li>
          <li className={th.__Card}>Best Games</li>
          <li className={th.__Card}>Best of 2017</li>
          <li className={th.__Card}>Best of 2016</li>
          <li className={th.__Card}>Released in the Last 3 Months</li>
          <li className={th.__Card}>Most Popular Games</li>
          <li className={th.__Card}>Playtime For The Buck</li>
          <li className={th.__Card}>Highest System Requirements</li>
          <li className={th.__Card}>VR Games</li>
          <li className={th.__Card}>VR Steam/Oculus exclusives</li>
          <li className={th.__Card}>VR Tracked Controllers</li>
          <li className={th.__Card}>For Linux</li>
          <li className={th.__Card}>Local Co-op</li>
        </ul>
      </div>
    )
  }
}
