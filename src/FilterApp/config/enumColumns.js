export default {
  values: {
    features: {
      steam_achievements: 1,
      steam_trading_cards: 2,
      // vr_support:          4,
      steam_workshop: 8,
      steam_cloud: 16,
      valve_anti_cheat: 32
    },

    platforms: {
      win: 1,
      mac: 2,
      linux: 4
    },

    players: {
      single_player: 1,
      multi_player: 2,
      co_op: 4,
      local_co_op: 8
    },

    vr_platforms: {
      vive: 1,
      oculus: 2
    },

    vr_mode: {
      seated: 1,
      standing: 2,
      room_scale: 4
    },

    vr_controllers: {
      tracked: 1,
      gamepad: 2,
      keyboard_mouse: 4
    },

    controller_support: {
      no: 1,
      partial: 2,
      full: 3
    }
  },

  names: {
    features: {
      steam_achievements: 'Steam Achievements',
      steam_trading_cards: 'Steam Trading Cards',
      // vr_support:          'VR Support',
      steam_workshop: 'Steam Workshop',
      steam_cloud: 'Steam Cloud',
      valve_anti_cheat: 'VAC (Valve Anti-Cheat)'
    },

    platforms: {
      win: 'Windows',
      mac: 'Mac',
      linux: 'Linux/SteamOS'
    },

    players: {
      single_player: 'Single player',
      multi_player: 'Multiplayer',
      co_op: 'Co-op',
      local_co_op: 'Local co-op'
    },

    vr_platforms: {
      vive: 'HTC Vive',
      oculus: 'Oculus Rift'
      // open: 'Open VR'
    },

    vr_mode: {
      seated: 'Seated',
      standing: 'Standing',
      room_scale: 'Room Scale'
    },

    vr_controllers: {
      tracked: 'Tracked',
      gamepad: 'Gamepad',
      keyboard_mouse: 'Keyboard & Mouse'
    },

    controller_support: {
      no: 'No',
      partial: 'Partial',
      full: 'Full'
    }
  }
}
