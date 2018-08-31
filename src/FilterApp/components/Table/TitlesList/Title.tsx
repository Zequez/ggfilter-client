import * as React from 'react';
import * as th from './TitlesList.sass';
import * as cx from 'classnames';

import { Filter }  from '../../../../Definitions';
import { FilterConfig }  from '../../../filter';

type TitleProps = {
  filter: Filter;
  config: FilterConfig;
  onSort: () => void;
};

export default class Title extends React.Component<TitleProps> {
  onSort = (ev) => {
    if (this.props.filter.sort) {
      this.props.onSort();
      // this.props.onSort(!this.props.config.sort);
    }
  }

  render () {
    // console.logRender('DataTableTitle');

    let { filter, config } = this.props;

    const titleClass = cx(th.TitlesList__Title, filter.name, {
      [th.TitlesList__Title_sorted]: config.sort != null,
      [th.TitlesList__Title_left]: filter.alignment === -1,
      [th.TitlesList__Title_center]: filter.alignment === 0,
      [th.TitlesList__Title_right]: filter.alignment === 1,
      [th.TitlesList__Title_sortable]: !!filter.sort
    });

    const sortIconClass = cx(
      th.TitlesList__SortIcon, 'fa', 'icon-sort-' + (config.sort ? 'asc' : 'desc'));

    return (
      <th
        ref='th'
        className={titleClass}
        onClick={this.onSort}>
        <div className={th.TitlesList__Overflow}>
          {config.sort != null ? (
            <span className={sortIconClass}></span>
          ) : null}
          <span className={th.TitlesList__Text}>
            {filter.title}
          </span>
        </div>
      </th>
    );
  }
}
