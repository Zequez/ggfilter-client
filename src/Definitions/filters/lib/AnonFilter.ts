import * as React from 'react';
import { Filters, Columns } from '../../../Api';
import { Text as TextControl } from '../components/controls/Text';
import { Raw as RawCell } from '../components/cells/Raw';
import { Raw as RawChip } from '../components/chips/Raw';

type ReactComponentType = React.StatelessComponent<any> | React.ComponentClass<any>;
type ControlOutputs = (query: object) => {[k: string]: object};
type CellInputs = {[k: string]: Columns};
type BoundInputs = {[k: string]: string}; // String value should actually be FilterNames

type Arguments = {
  api?: Filters;
  title?: string;
  description?: string;
  sort?: Columns;
  width?: number;
  alignment?: -1 | 0 | 1;
  control?: ReactComponentType;
  controlOutputs?: ControlOutputs;
  cell?: ReactComponentType;
  cellInputs?: CellInputs;
  boundInputs?: BoundInputs;
  chip?: ReactComponentType;
  shortcuts?: object[];
};

export default class AnonFilter {
  api: Filters = null;
  title: string = null;
  description: string = null;
  sort: Columns = null;
  fineTune: boolean = false;

  width: number = 100;
  alignment: -1 | 0 | 1 = -1;

  control: ReactComponentType = TextControl;
  controlOutputs: ControlOutputs = null;

  cell: ReactComponentType = RawCell;
  cellInputs: CellInputs = null;

  boundInputs: BoundInputs = {};

  chip: ReactComponentType = RawChip;

  shortcuts: object[] = [];

  constructor(args: Arguments) {
    for (let attr in args) {
      this[attr] = args[attr];
    }

    if (this.sort !== undefined) this.sort = <Columns> this.api;
    if (!this.controlOutputs) this.controlOutputs = (query) => ({[this.api]: query});
    if (!this.cellInputs) this.cellInputs = {value: <Columns> this.api};
  }
}
