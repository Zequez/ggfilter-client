import * as React from 'react';
import * as th from './Body.sass';
import { FiltersConfiguration, Game } from '../../../filter';
import { FiltersNames } from '../../../../Definitions';
import extractColumns from '../lib/extractColumns';
import CellComponent from './CellComponent';

interface BatchType {
  games: Game[];
  configuration: FiltersConfiguration;
  setQuery: (filter: FiltersNames, query: object) => void;
  setLightbox: (images: string[], thumbnails: string[]) => void;
};

export default class Batch extends React.Component<BatchType> {
  // shouldComponentUpdate (np, ns) {
  //   let p = this.props
  //   return np.games !== p.games
  // }

  render () {
    // console.logRender('DataTableBatch')

    let { games, configuration, setQuery } = this.props;

    let columns = extractColumns(configuration);

    return (
      <tbody className={th.Body__Batch}>
        {games.map((game) =>
          <tr key={game.id} className={th.Body__Row}>
            {columns.map((filter) =>
              <CellComponent
                key={filter.name}
                game={game}
                filter={filter}
                configuration={configuration}
                setQuery={(query) => this.props.setQuery(filter.name, query)}
                setLightbox={this.props.setLightbox}/>
            )}
          </tr>
        )}
      </tbody>
    )
  }
}
