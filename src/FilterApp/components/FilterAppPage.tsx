import * as React from 'react';
import { connect } from 'react-redux';
import { Page } from 'src/Layout';
import { hyperFilter } from '../filter/selectors';
import { HyperFilter } from '../filter/stateTypes';
import { getGames, loadFilter, navigateToFilter } from '../filter/actions';
import FilterApp from './FilterApp';

interface StateProps {
  hyperFilter: HyperFilter;
}

interface DispatchProps {
  getGames: (page: number) => void;
  loadFilter: (sid: string) => void;
  navigateToFilter: (filter: HyperFilter) => void;
}

type FilterAppPageProps = StateProps & DispatchProps & {
  sid: string;
  slug: string;
};

class FilterAppPage extends React.Component<FilterAppPageProps> {
  componentWillMount () {
    this.loadFilter(this.props);
  }

  shouldComponentUpdate (np) {
    let tp = this.props;
    return (
      np.sid !== tp.sid || np.slug !== tp.slug
    );
  }

  componentWillUpdate (props) {
    this.loadFilter(props);
  }

  // componentWillReceiveProps (props) {
  //   // let { sid, slug, sfilter, navigateTo } = props;
  //   // if (sid && !slug && sfilter && sfilter.nameSlug) {
  //   //   navigateTo('filterFull', {sid: sfilter.sid, slug: sfilter.nameSlug})
  //   // }
  // }

  loadFilter ({sid, slug, hyperFilter}) {
    if (!sid) {
      if (hyperFilter.sid) {
        if (hyperFilter.parentId) {
          this.props.navigateToFilter(hyperFilter);
        }
      } else {
        this.props.loadFilter('0');
      }
    } else if (hyperFilter.sid !== sid) {
      this.props.loadFilter(sid);
    }
    // if (sid && (!hyperFilter || hyperFilter.sid !== sid)) {

    // } else if (!sid && (!sfilter || sfilter.frontPage !== 0)) {
    //   // this.props.loadFrontPageFilters()
    //   this.props.getGames(0);
    // }
  }

  render () {
    return (
      <Page title='Filter'>
        <FilterApp/>
      </Page>
    );
  }
}

export default connect<StateProps, DispatchProps, {}>((s) => ({
  hyperFilter: hyperFilter(s)
}), {
  getGames,
  loadFilter,
  navigateToFilter
})(FilterAppPage);
