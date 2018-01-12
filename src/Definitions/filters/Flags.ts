import Filter from './lib/Filter';
import { BooleanCell } from './components/cells/BooleanCell';
import { BooleanCtrl } from './components/controls/BooleanCtrl';

export const Platforms = new Filter('Platforms', {
  title: 'Platforms',
  cell: BooleanCell,
  control: BooleanCtrl
});

export const Players = new Filter('Players', {
  title: 'Players',
  cell: BooleanCell,
  control: BooleanCtrl
});

export const VrPlatforms = new Filter('VrPlatforms', {
  title: 'VR Platforms',
  cell: BooleanCell,
  control: BooleanCtrl
});

export const Controllers = new Filter('Controllers', {
  title: 'Controllers',
  cell: BooleanCell,
  control: BooleanCtrl
});

export const VrModes = new Filter('VrModes', {
  title: 'VR Modes',
  cell: BooleanCell,
  control: BooleanCtrl
});
