import autoTitleDefinitions from './autoTitleDefinitions'
import enumColumns from './enumColumns'

describe('autotitle definitions', () => {
  function testMulti (name, ranges) {
    for (let r of ranges) {
      testBasic(name, r[0], r[1], r[2])
    }
  }

  function testBasic (name, params, expectation, store = {}) {
    let jp = JSON.stringify(params)
    it(`should have a "${name}" definition ${jp}`, () => {
      expect(autoTitleDefinitions[name](params, store)).toEqual(expectation)
    })
  }

  describe('name', () => {
    testMulti('name', [
      [{value: 'Hello'}, 'with the name <"Hello">'],
      [{value: '<script>Hello'}, 'with the name <"&lt;script&gt;Hello">']
    ])
  })

  describe('steam_id', () => {
    testMulti('steam_id', [
      [{value: '12345'}, 'with the Steam ID <12345>']
    ])
  })

  describe('lowest_steam_price', () => {
    testMulti('lowest_steam_price', [
      [{gt: 100, lt: 500}, 'with a price of <$1-5> on Steam'],
      [{gt: 100, lt: null}, 'with a price <≥$1> on Steam'],
      [{gt: null, lt: 400}, 'with a price <≤$4> on Steam'],
      [{gt: 0, lt: 400}, 'with a price <≤$4> on Steam'],
      [{gt: 0, lt: 0}, '<free> on Steam'],
      [{gt: 1, lt: null}, '<non-free> on Steam']
    ])
  })

  describe('steam_discount', () => {
    testMulti('steam_discount', [
      [{gt: 10, lt: 50}, '<on sale> on Steam with a discount of <10-50%>'],
      [{gt: 20, lt: null}, '<on sale> on Steam with a discount <≥20%>'],
      [{gt: 20, lt: 100}, '<on sale> on Steam with a discount <≥20%>'],
      [{gt: null, lt: 90}, 'with a discount <≤90%> on Steam'],
      [{gt: 0, lt: 90}, 'with a discount <≤90%> on Steam'],
      [{gt: 1, lt: 90}, '<on sale> on Steam with a discount <≤90%>'],
      [{gt: 1, lt: null}, '<on sale> on Steam'],
      [{gt: 0, lt: 0}, "that <aren't on sale> on Steam"],
      [{gt: 100, lt: 100}, 'with <100% discount given away for FREE> on Steam']
    ])
  })

  describe('playtime_mean', () => {
    testMulti('playtime_mean', [
      [{gt: 1.25, lt: 5.25}, 'with an average playtime of <1.25-5.25hs>'],
      [{gt: 3, lt: null}, 'with an average playtime <≥3hs>'],
      [{gt: null, lt: 2}, 'with an average playtime <≤2hs>']
    ])
  })

  describe('playtime_median', () => {
    testMulti('playtime_median', [
      [{gt: 1.25, lt: 5.25}, 'with a median playtime of <1.25-5.25hs>'],
      [{gt: 3, lt: null}, 'with a median playtime <≥3hs>'],
      [{gt: null, lt: 2}, 'with a median playtime <≤2hs>']
    ])
  })

  describe('playtime_sd', () => {
    testMulti('playtime_sd', [
      [{gt: 1.25, lt: 5.25}, 'with a playtime standard deviation of <1.25-5.25hs>'],
      [{gt: 3, lt: null}, 'with a playtime standard deviation <≥3hs>'],
      [{gt: null, lt: 2}, 'with a playtime standard deviation <≤2hs>']
    ])
  })

  describe('playtime_rsd', () => {
    testMulti('playtime_rsd', [
      [{gt: 1.25, lt: 5.25}, 'with a playtime relative standard deviation of <1.25-5.25hs>'],
      [{gt: 3, lt: null}, 'with a playtime relative standard deviation <≥3hs>'],
      [{gt: null, lt: 2}, 'with a playtime relative standard deviation <≤2hs>']
    ])
  })

  describe('playtime_mean_ftb', () => {
    testMulti('playtime_mean_ftb', [
      [{gt: 1.25, lt: 5.25}, 'with an avg. playtime / price of <1.25-5.25hs/$>'],
      [{gt: 3, lt: null}, 'with an avg. playtime / price <≥3hs/$>'],
      [{gt: null, lt: 2}, 'with an avg. playtime / price <≤2hs/$>']
    ])
  })

  describe('playtime_median_ftb', () => {
    testMulti('playtime_median_ftb', [
      [{gt: 1.25, lt: 5.25}, 'with a median playtime / price of <1.25-5.25hs/$>'],
      [{gt: 3, lt: null}, 'with a median playtime / price <≥3hs/$>'],
      [{gt: null, lt: 2}, 'with a median playtime / price <≤2hs/$>']
    ])
  })

  describe('metacritic', () => {
    testMulti('metacritic', [
      [{gt: 10, lt: 70}, 'with a Metacritic of <10-70>'],
      [{gt: 90, lt: null}, 'with a Metacritic <≥90>'],
      [{gt: null, lt: 20}, 'with a Metacritic <≤20>']
    ])
  })

  describe('steam_reviews_count', () => {
    testMulti('steam_reviews_count', [
      [{gt: 10, lt: 70}, 'with <10-70> reviews on Steam'],
      [{gt: 90, lt: null}, 'with <≥90> reviews on Steam'],
      [{gt: null, lt: 20}, 'with <≤20> reviews on Steam']
    ])
  })

  describe('steam_reviews_ratio', () => {
    testMulti('steam_reviews_ratio', [
      [{gt: 10, lt: 70}, 'with a Steam reviews ratio of <10-70%>'],
      [{gt: 90, lt: null}, 'with a Steam reviews ratio <≥90%>'],
      [{gt: null, lt: 20}, 'with a Steam reviews ratio <≤20%>']
    ])
  })

  describe('features', () => {
    let e = enumColumns.values.features
    testMulti('features', [
      [
        {value: e.steam_achievements, or: false},
        'with support for <Steam Achievements>'
      ],
      [
        {value: e.steam_workshop + e.steam_cloud, or: false},
        'with support for <Steam Workshop> and <Steam Cloud>'
      ],
      [
        {value: e.steam_workshop + e.steam_trading_cards + e.valve_anti_cheat, or: false},
        'with support for <Steam Trading Cards>, <Steam Workshop> and <VAC (Valve Anti-Cheat)>'
      ],
      [
        {value: e.steam_achievements, or: true},
        'with support for <Steam Achievements>'
      ],
      [
        {value: e.steam_workshop + e.steam_cloud, or: true},
        'with support for <Steam Workshop> or <Steam Cloud>'
      ],
      [
        {value: e.steam_workshop + e.steam_trading_cards + e.valve_anti_cheat, or: true},
        'with support for <Steam Trading Cards>, <Steam Workshop> or <VAC (Valve Anti-Cheat)>'
      ]
    ])
  })

  describe('platforms', () => {
    let e = enumColumns.values.platforms
    testMulti('platforms', [
      [{value: e.mac, or: false}, 'for <Mac>'],
      [{value: e.win + e.mac, or: false}, 'for <Windows> and <Mac>'],
      [{value: e.win + e.mac + e.linux, or: false}, 'for <Windows>, <Mac> and <Linux/SteamOS>'],
      [{value: e.mac, or: true}, 'for <Mac>'],
      [{value: e.win + e.mac, or: true}, 'for <Windows> or <Mac>'],
      [{value: e.win + e.mac + e.linux, or: true}, 'for <Windows>, <Mac> or <Linux/SteamOS>']
    ])
  })

  describe('players', () => {
    let e = enumColumns.values.players
    testMulti('players', [
      [{value: e.single_player, or: false}, 'with <Single player> support'],
      [{value: e.co_op + e.local_co_op, or: false}, 'with <Co-op> and <Local co-op> support'],
      [{value: e.multi_player + e.co_op + e.local_co_op, or: false}, 'with <Multiplayer>, <Co-op> and <Local co-op> support'],
      [{value: e.single_player, or: true}, 'with <Single player> support'],
      [{value: e.co_op + e.local_co_op, or: true}, 'with <Co-op> or <Local co-op> support'],
      [{value: e.multi_player + e.co_op + e.local_co_op, or: true}, 'with <Multiplayer>, <Co-op> or <Local co-op> support']
    ])
  })

  describe('vr', () => {
    let e = enumColumns.values.vr
    testMulti('vr', [
      [{value: e.vive, or: false}, 'with support for the <HTC Vive>'],
      [{value: e.vive + e.oculus, or: false}, 'with support for the <HTC Vive> and the <Oculus Rift>'],
      [{value: e.vive, or: true}, 'with support for the <HTC Vive>'],
      [{value: e.vive + e.oculus, or: true}, 'with support for the <HTC Vive> or the <Oculus Rift>']
    ])
  })

  describe('controller_support', () => {
    let e = enumColumns.values.controller_support
    testMulti('controller_support', [
      [{gt: e.partial, lt: e.partial}, 'with <only partial controller support>'],
      [{gt: e.full, lt: e.full}, 'with <full controller support>'],
      [{gt: e.no, lt: e.no}, 'with <no controller support>'],
      [{gt: e.partial, lt: e.full}, 'with <partial or full controller support>'],
      [{gt: e.no, lt: e.partial}, 'with <partial or no controller support>']
    ])
  })

  describe('tags', () => {
    testMulti('tags', [
      [{tags: [1, 2, 3, 4]}, 'tagged as <tag1>, <tag2>, <tag3> and <tag4>', {tags: ['', 'tag1', 'tag2', 'tag3', 'tag4']}],
      [{tags: [1]}, 'tagged as <tag&gt;1>', {tags: ['', 'tag>1']}]
    ])
  })

  describe('sysreq_index_centile', () => {
    testMulti('sysreq_index_centile', [
      [{gt: 10, lt: 70}, 'with a system requirements index of <10-70>'],
      [{gt: 90, lt: null}, 'with a system requirements index <≥90>'],
      [{gt: null, lt: 20}, 'with a system requirements index <≤20>']
    ])
  })

  describe('released_at', () => {
    testMulti('released_at', [
      [{gt: 60 * 60 * 24 * 7, lt: 0}, 'released in the <last 1 week>'],
      [{gt: 60 * 60 * 24 * 7 * 3, lt: 0}, 'released in the <last 3 weeks>'],
      [{gt: 60 * 60 * 24 * 365 * 1 / 12, lt: 0}, 'released in the <last 1 month>'],
      [{gt: 60 * 60 * 24 * 365 * 6 / 12, lt: 0}, 'released in the <last 6 months>'],
      [{gt: 60 * 60 * 24, lt: 0}, 'released in the <last 1 day>'],
      [{gt: 60 * 60 * 24 * 365, lt: 0}, 'released in the <last 1 year>'],
      [{gt: 60 * 60 * 24 * 365 * 10, lt: 0}, 'released in the <last 10 years>'],
      [{gt: null, lt: 60 * 60 * 24 * 365 * 5}, '<older than 5 years>'],
      [{gt: 60 * 60 * 24 * 5, lt: 60 * 60 * 24}, 'released between <5 days and 1 day ago>']
    ])
  })
})
