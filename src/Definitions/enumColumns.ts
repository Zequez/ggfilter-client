export default {
  values: {
    Stores: {
      steam: 1,
      oculus: 2
    },
    Players: {
      single: 1,
      multi: 2,
      online: 4,
      co_op: 8,
      shared: 16
      // hotseat: 32,
      // cross_platform: 64
    },
    Controllers: {
      tracked: 1,
      gamepad: 2,
      keyboard_mouse: 4
    },
    VrPlatforms: {
      vive: 1,
      rift: 2,
      osvr: 4
    },
    VrModes: {
      seated: 1,
      standing: 2,
      room_scale: 4
    },
    Platforms: {
      win: 1,
      mac: 2,
      linux: 4
    }
    // gamepad: {
    //   no: 1,
    //   partial: 2,
    //   full: 3
    // }
  },

  names: {
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
  }
}
