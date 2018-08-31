import AnonFilter from './lib/Filter';
import enums from '../enumColumns';
import { BooleanCell } from './components/cells/BooleanCell';
import { BooleanCtrl } from './components/controls/BooleanCtrl';

export const Platforms = new AnonFilter({
  api: 'platforms',
  title: 'Platforms',
  cell: BooleanCell,
  control: BooleanCtrl,
  width: Object.keys(enums.names.Platforms).length * 20
});

export const Players = new AnonFilter({
  api: 'players',
  title: 'Players',
  cell: BooleanCell,
  control: BooleanCtrl,
  width: Object.keys(enums.names.Players).length * 20
});

export const VrPlatforms = new AnonFilter({
  api: 'vr_platforms',
  title: 'VR Platforms',
  cell: BooleanCell,
  control: BooleanCtrl,
  width: Object.keys(enums.names.VrPlatforms).length * 20
});

export const Controllers = new AnonFilter({
  api: 'controllers',
  title: 'Controllers',
  cell: BooleanCell,
  control: BooleanCtrl,
  width: Object.keys(enums.names.Controllers).length * 20
});

export const VrModes = new AnonFilter({
  api: 'vr_modes',
  title: 'VR Modes',
  cell: BooleanCell,
  control: BooleanCtrl,
  width: Object.keys(enums.names.VrModes).length * 20
});

export const Stores = new AnonFilter({
  api: 'stores',
  title: 'Stores',
  cell: BooleanCell,
  control: BooleanCtrl,
  width: Object.keys(enums.names.Stores).length * 20
});
