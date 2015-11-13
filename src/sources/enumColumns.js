export default {
  values: {
    features: {
      steam_achievements:  1,
      steam_trading_cards: 2,
      vr_support:          4,
      steam_workshop:      8,
      steam_cloud:         16,
      valve_anti_cheat:    32
    },

    platforms: {
      win:   1,
      mac:   2,
      linux: 4
    },

    players: {
      single_player:  1,
      multi_player:   2,
      co_op:          4,
      local_co_op:    8
    },

    controller_support: {
      no: 1,
      partial: 2,
      full: 3
    }
  },

  names: {
    features: {
      steam_achievements:  'Steam Achievements',
      steam_trading_cards: 'Steam Trading Cards',
      vr_support:          'VR Support',
      steam_workshop:      'Steam Workshop',
      steam_cloud:         'Steam Cloud',
      valve_anti_cheat:    'VAC (Valve Anti Cheat)'
    },

    platforms: {
      win:   'Windows',
      mac:   'OSX',
      linux: 'Linux/SteamOS'
    },

    players: {
      single_player:  'Single player'
      multi_player:   'Multiplayer',
      co_op:          'Co-op',
      local_co_op:    'Local co-op'
    },

    controller_support: {
      no: 'No',
      partial: 'Partial',
      full: 'Full'
    }
  }
}
