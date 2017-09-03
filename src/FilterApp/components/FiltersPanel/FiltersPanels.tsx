import * as React from 'react';
import { connect } from 'react-redux';
import FiltersCategory from './FiltersCategory';
const th = require('./FiltersPanels.sass');

import definitions from '../../../Definitions';

const {
  selectors: { controlsList },
  actions: { setControl }
} = require('../../filter');

interface Props {
  setControl: () => {};
  controlsList: string[];
}

// @connect((s) => ({controlsList: controlsList(s)}), { setControl })
export class FiltersPanels extends React.Component<Props, null> {
  render () {
    return (
      <div className={th.FiltersPanels}>
        <FiltersCategory title='Yay!'/>
      </div>
    );
  }
}

export default connect(
  (s) => ({controlsList: controlsList(s)}),
  { setControl }
)(FiltersPanels);
