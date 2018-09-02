import * as React from 'react';
import * as th from './Body.sass';
import * as cx from 'classnames';
import { FiltersConfiguration } from '../../../filter';
import { Filter, FiltersNames } from '../../../../Definitions';
import { partial } from 'shared/lib/utils';

function cellInputValues (filter: Filter, configuration: FiltersConfiguration, game: {}) {
  let cellInputs = {};
  for (let inputName in filter.cellInputs) {
    let columnName = filter.cellInputs[inputName];
    cellInputs[inputName] = game[columnName];
  }
  cellInputs['name'] = filter.name;

  for (let inputName in filter.boundInputs) {
    let paramName = filter.boundInputs[inputName] as FiltersNames;
    let filterConfig = configuration[paramName];
    cellInputs[inputName] = filterConfig && filterConfig.query;
  }

  return cellInputs;
}

interface CellComponentProps {
  game: {};
  filter: Filter;
  configuration: FiltersConfiguration;
  setQuery: (query: object) => void;
  setLightbox: (images: string[], thumbnails: string[]) => void;
};

export default ({game, filter, configuration, setQuery, setLightbox}: CellComponentProps) => {
  let tdClass = cx(
    filter.name,
    th.Body__ColumnComponent, {
      [th.Body__ColumnComponent_hl]: !!game['hl_' + filter.name],
      [th.Body__ColumnComponent_left]: filter.alignment === -1,
      [th.Body__ColumnComponent_center]: filter.alignment === 0,
      [th.Body__ColumnComponent_right]: filter.alignment === 1
    }
  );

  let Component = filter.cell;

  let props = cellInputValues(filter, configuration, game);

  if (Component['active']) {
    props['setQuery'] = setQuery;
  }

  if (Component['lightbox']) {
    props['setLightbox'] = setLightbox;
  }

  let comp = <Component {...props}/>;

  return (
    <td className={tdClass}>
      {Component['noOverflowContainer']
        ? comp
        : <div className={th.Body__OverflowCell}>{comp}</div>}
    </td>
  );
};
