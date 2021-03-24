import * as React from 'react';
import * as th from './FrontPage.sass';
import { types, QueryChipList } from 'src/FilterApp';
import Button from 'shared/components/Button';

interface FilterCardProps {
  filter: types.HyperFilter;
}

export default class FilterCard extends React.Component<FilterCardProps, null> {
  render () {
    let { filter } = this.props;

    return (
      <li className={th.FilterCard}>
          <div className={th.cardHeader}>
            <h3>{filter.name || 'Unnamed Filter'}</h3>
            <Button label='Rename'></Button>
            <Button label='Preview'></Button>
          </div>
        <div className={th.cardBody}>
          <QueryChipList configuration={filter.configuration}/>
        </div>
        <div className={th.cardFooter}>
          <div className={th.gamesCounter}>
            <div className={th.totalGames}>50 games</div>
            <div className={th.totalOnSale}>20 on sale</div>
          </div>
          <div className={th.buttons}>
            <Button flat label='Delete'></Button>
            <Button link={`/f/${filter.sid}`} label='Load'></Button>
          </div>
        </div>
      </li>
    );
  }
}
