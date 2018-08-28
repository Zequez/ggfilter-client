import * as React from 'react';
import * as th from './Configurator.sass';
import Section from './Section';

import definitions from '../../../Definitions';

// type ControlsNames = 'name' | 'price';


interface ConfiguratorProps {
  // controlsSections: [key: string]: ;
  // controlsData: {[k: Controls]: object};
  // controlsData: Map<ControlsNames, object>;
  // controls: object[];
  onControlChange: (control: string, data: object) => {};
  // columnsSections: string[];
  // columns: string[];
  selectedColumns: string[];
  onColumnsChange: (selectedColumns: string[]) => {};
}

export default class Configurator extends React.Component {
  render () {
    return <div className={th.Configurator}>
      {definitions.categoriesList.map((category) =>
        <Section title={category.title} key={category.name}>
          {category.filters.map((filterName) =>
            <div key={filterName}>{filterName}</div>
          )}
        </Section>
      )}

      <Section title='Columns'>
        All the columns
      </Section>
    </div>;
  }
}
