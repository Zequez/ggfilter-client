import * as React from 'react';
import { connect } from 'react-redux';
import * as th from './FrontPage.sass';

import { getOwnFilters } from '../selectors';
import { loadOwnFilters } from '../reducer';

import { Page } from 'src/Layout';
import { types } from 'src/FilterApp';
import FiltersList from './FiltersList';

interface StateProps {
  ownFilters: types.HyperFilter[];
}

interface DispatchProps {
  loadOwnFilters: (limit: number) => void;
}

type FrontPageProps = StateProps & DispatchProps;

export class FrontPage extends React.Component<FrontPageProps, null> {
  componentWillMount () {
    this.props.loadOwnFilters(6);
  }

  // General Filters
  // - All Time Most Popular Games
  // - Top Percentiles Most Popular Games
  // - Games With The Most Hours Played
  // - Most Bang For the Buck (hours/$)
  // - Couch Multiplayer

  // Price-based Filters
  // - Games On Sale
  // - Games On Sale, 50%+ discount
  // - Free Forever Games (100% discount)

  // Genre-based Filters
  // - Most Popular Simulation Games
  // - Most Popular RPG Games
  // - Most Popular FPS Games
  // - Most Popular Strategy Games

  // Dates-based Filters
  // - Most Recently Released
  // - Released In The Last Month
  // - Released In The Last 3 Months
  // - Best of 2018
  // - Best of 2017
  // - Popular 10 years+ games

  // Platforms-based Filters
  // - VR Games
  // - Mac Games
  // - Linux Games
  // - Low System Requirements

  render () {
    let { ownFilters } = this.props;
    return (
      <Page title='GGFilter'>
        <div className={th.FrontPage}>
          <div className={th.topBackground}></div>
          <div className={th.content}>
            Load a pre-made filter from below, or <a href='/f'>create one from scratch</a>.
            <FiltersList title='Your Last Filters' filters={ownFilters}/>
          </div>
        </div>
      </Page>
    );
  }
}


export default connect<StateProps, DispatchProps, {}>((s) => ({
  ownFilters: getOwnFilters(s)
}), {
  loadOwnFilters
})(FrontPage);
