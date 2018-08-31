import * as React from 'react';
import { FiltersConfiguration } from '../../filter';
import extractColumns from './lib/extractColumns';
import definitions, { FiltersNames, Filter } from '../../../Definitions';
import { debounce } from 'lodash';
import { configuration } from '../../filter';
import { setupMaster } from 'cluster';

interface NewColumnsWidthFixatorProps {
  configuration: FiltersConfiguration;
}

class WidthCalculator {
  configuration: FiltersConfiguration;
  filters: Filter[];
  row: any;

  constructor (configuration, row) {
    this.row = row;
    this.configuration = configuration;
    this.filters = extractColumns(configuration);
  }

  table () {
    return this.row['parentNode']['parentNode'];
  }

  containerWidth () {
    return this.table()['parentNode'].offsetWidth;
  }

  setTableWidth () {
    let table = this.table();
    let minTableWidth = this.minTableWidth();
    let containerWidth = this.containerWidth();
    let tableWidth = Math.max(minTableWidth, containerWidth);
    table.style.width = tableWidth + 'px';
  }

  adjustedFiltersWidths () {
    let widths = this.rawFiltersWidths();
    if (this.row) {
      let minTableWidth = this.minTableWidth();
      let containerWidth = this.containerWidth();
      if (minTableWidth < containerWidth) {
        let filterThatStretches = this.indexOfFilterThatStretches();
        if (filterThatStretches !== -1) {
          widths[filterThatStretches] += containerWidth - minTableWidth;
        }
      }
    }
    return widths;
  }

  minTableWidth () {
    return this.rawFiltersWidths().reduce((sum, num) => sum + num);
  }

  rawFiltersWidths () {
    return this.filters.map((filter) => this.filterWidth(filter));
  }

  filterWidth (filter: Filter) {
    return typeof filter.width === 'function'
      ? filter.width.call(null, this.configuration[filter.name].query) as number
      : filter.width;
  }

  indexOfFilterThatStretches () {
    return this.filters.findIndex((filter) => filter.widthStretch);
  }
}

export default class NewColumnsWidthFixator extends React.Component<NewColumnsWidthFixatorProps, null> {
  debouncedResize = null;

  componentDidMount () {
    this.setTableWidth();

    this.debouncedResize = debounce(this.setTableWidthFromResize, 100);
    window.addEventListener('resize', this.debouncedResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debouncedResize);
  }

  componentDidUpdate () {
    this.setTableWidth();
  }

  setTableWidth = () => {
    this.widthCalculator().setTableWidth();
  }

  setTableWidthFromResize = () => {
    this.setTableWidth();
    this.forceUpdate();
  }

  widthCalculator () {
    return new WidthCalculator(this.props.configuration, this.refs.row);
  }

  render () {
    let styles = this.widthCalculator()
      .adjustedFiltersWidths().map((width) => ({width: `${width}px`}));

    return (
      <tr ref='row'>
        {styles.map((style, i) => <td key={i} style={style}></td>)}
      </tr>
    );
  }
}
