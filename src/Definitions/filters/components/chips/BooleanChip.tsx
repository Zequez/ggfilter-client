import * as React from 'react';
import * as th from './chips.sass';
import { Boolean } from '../../../../Api';
import enumColumns, { sorter } from '../../../enumColumns';
import Icon from 'shared/components/Icon';


interface BooleanChipProps {
  query: Boolean;
  name: string;
}

export default class BooleanChip extends React.Component<BooleanChipProps> {
  static title = (query: Boolean, name: string, title: string) => {
    let values = sorter(name, query.value).map((v) => enumColumns[name][v]);
    return `${title} ` + values.join(` ${query.mode} `);
  }

  render () {
    let { query, name } = this.props;
    let elements: JSX.Element[] = [];
    sorter(name, query.value).forEach((v, i) => {
      elements.push(<Icon key={`${i}i`} icon={`boolean-${name}-${v}`}/>);
      if (i < query.value.length - 1) {
        elements.push(<span key={`${i}s`}> {query.mode} </span>);
      }
    });

    return (
      <span className={th.BooleanChip}>
        {elements}
      </span>
    );
  }
}
