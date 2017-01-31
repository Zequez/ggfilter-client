export default {
  values: {
    'stores': {
      'steam': 1,
      'oculus': 2
    },
    'players': {
      'single': 1,
      'multi': 2,
      'online': 4,
      'co_op': 8,
      'shared': 16
      // 'hotseat': 32,
      // 'cross_platform': 64
    },
    'controllers': {
      'tracked': 1,
      'gamepad': 2,
      'keyboard_mouse': 4
    },
    'vr_platforms': {
      'vive': 1,
      'rift': 2,
      'osvr': 4
    },
    'vr_modes': {
      'seated': 1,
      'standing': 2,
      'room_scale': 4
    },
    'platforms': {
      'win': 1,
      'mac': 2,
      'linux': 4
    }
    // 'gamepad': {
    //   'no': 1,
    //   'partial': 2,
    //   'full': 3
    // }
  },

  names: {
    stores: {
      steam: 'Steam',
      oculus: 'Oculus'
    },
    players: {
      'single': 'Single Player',
      'multi': 'Multiplayer',
      'online': 'Online',
      'co_op': 'Co-op',
      'shared': 'Same Computer',
      'hotseat': 'Hotseat',
      'cross_platform': 'Cross Platform'
    },
    'controllers': {
      'tracked': 'Tracked controllers',
      'gamepad': 'Gamepad',
      'keyboard_mouse': 'Keyboard & mouse'
    },
    'vr_platforms': {
      'vive': 'HTC Vive',
      'rift': 'Oculus Rift',
      'osvr': 'Open-Source VR'
    },
    'vr_modes': {
      'seated': 'Seated',
      'standing': 'Standing',
      'room_scale': 'Room scale'
    },
    'platforms': {
      'win': 'Windows',
      'mac': 'Mac',
      'linux': 'Linux'
    },
    // 'gamepad': {
    //   'no': 1,
    //   'partial': 2,
    //   'full': 3
    // }
  }
}
