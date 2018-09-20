const columns = {
  Stores: {
    steam: 'Steam',
    oculus: 'Oculus'
  },
  Players: {
    single: 'Single Player',
    multi: 'Multiplayer',
    online: 'Online',
    co_op: 'Co-op',
    shared: 'Local Multiplayer'
  },
  Controllers: {
    tracked: 'Tracked controllers',
    gamepad: 'Gamepad',
    keyboard_mouse: 'Keyboard & mouse'
  },
  VrPlatforms: {
    vive: 'HTC Vive',
    rift: 'Oculus Rift',
    osvr: 'Open-Source VR'
  },
  VrModes: {
    seated: 'Seated',
    standing: 'Standing',
    room_scale: 'Room scale'
  },
  Platforms: {
    win: 'Windows',
    mac: 'Mac',
    linux: 'Linux'
  },
  // gamepad: {
  //   no: 1,
  //   partial: 2,
  //   full: 3
  // }
};

export default columns;

export function sorter (name: string, values: string[]) {
  let sorted: string[] = [];
  for (let key in columns[name]) {
    if (values.indexOf(key) !== -1) sorted.push(key);
  }
  return sorted;
};
