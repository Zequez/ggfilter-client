import AnonFilter from './lib/Filter';
import enums from '../enumColumns';
import BooleanCell from './components/cells/BooleanCell';
import BooleanCtrl from './components/controls/BooleanCtrl/BooleanCtrl';
import BooleanChip from './components/chips/BooleanChip';

const iconWidth = 28;
const extraWidth = 16;
function getWidth (key) {
  return extraWidth + Object.keys(enums[key]).length * iconWidth;
}

export const Platforms = new AnonFilter({
  api: 'platforms',
  title: 'Platforms',
  cell: BooleanCell,
  control: BooleanCtrl,
  chip: BooleanChip,
  width: getWidth('Platforms')
});

export const Players = new AnonFilter({
  api: 'players',
  title: 'Players',
  cell: BooleanCell,
  control: BooleanCtrl,
  chip: BooleanChip,
  width: getWidth('Players')
});

export const VrPlatforms = new AnonFilter({
  api: 'vr_platforms',
  title: 'VR Platforms',
  cell: BooleanCell,
  control: BooleanCtrl,
  chip: BooleanChip,
  width: getWidth('VrPlatforms')
});

export const Controllers = new AnonFilter({
  api: 'controllers',
  title: 'Controllers',
  cell: BooleanCell,
  control: BooleanCtrl,
  chip: BooleanChip,
  width: getWidth('Controllers')
});

export const VrModes = new AnonFilter({
  api: 'vr_modes',
  title: 'VR Modes',
  cell: BooleanCell,
  control: BooleanCtrl,
  chip: BooleanChip,
  width: getWidth('VrModes')
});

export const Stores = new AnonFilter({
  api: 'stores',
  title: 'Stores',
  cell: BooleanCell,
  control: BooleanCtrl,
  chip: BooleanChip,
  width: getWidth('Stores')
});
