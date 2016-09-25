import generateAutoTitle from 'lib/AutoTitle'
import enumColumns from 'sources/EnumColumns'

describe('autotitle definitions', () => {
  function testBasic (name, params, expectation) {
    let jp = JSON.stringify(params)
    it(`should have a "${name}" definition ${jp}`, () => {
      expect(generateAutoTitle({[name]: params}))
      .to.equal(expectation)
    })
  }

  function testMulti (name, ranges) {
    for (let r of ranges) {
      testBasic(name, r[0], r[1])
    }
  }

  testBasic('name', {value: 'Hello'}, 'Games with the name "Hello"')
  testBasic('steam_id', {value: '12345'}, 'Games with the Steam ID 12345')

  describe('lowest_steam_price', () => {
    testMulti('lowest_steam_price', [
      [{gt: 100, lt: 500}, 'Games with a price ≥$1 and ≤$5 on Steam'],
      [{gt: 100, lt: null}, 'Games with a price ≥$1 on Steam'],
      [{gt: null, lt: 400}, 'Games with a price ≤$4 on Steam'],
      [{gt: 0, lt: 0}, 'Games free on Steam'],
      [{gt: 1, lt: null}, 'Games non-free on Steam']
    ])
  })

  describe('steam_discount', () => {
    testMulti('steam_discount', [
      [{gt: 10, lt: 50}, 'Games on sale on Steam with a discount ≥10% and ≤50%'],
      [{gt: 20, lt: null}, 'Games on sale on Steam with a discount ≥20%'],
      [{gt: null, lt: 90}, 'Games with a discount ≤90% on Steam'],
      [{gt: 1, lt: 90}, 'Games on sale on Steam with a discount ≤90%'],
      [{gt: 1, lt: null}, 'Games on sale on Steam'],
      [{gt: 0, lt: 0}, "Games that aren't on sale on Steam"],
      [{gt: 100, lt: 100}, 'Games with 100% discount given away for FREE on Steam']
    ])
  })

  describe('playtime_mean', () => {
    testMulti('playtime_mean', [
      [{gt: 1.25, lt: 5.25}, 'Games with an average playtime ≥1.25hs and ≤5.25hs'],
      [{gt: 3, lt: null}, 'Games with an average playtime ≥3hs'],
      [{gt: null, lt: 2}, 'Games with an average playtime ≤2hs']
    ])
  })

  describe('playtime_median', () => {
    testMulti('playtime_median', [
      [{gt: 1.25, lt: 5.25}, 'Games with a median playtime ≥1.25hs and ≤5.25hs'],
      [{gt: 3, lt: null}, 'Games with a median playtime ≥3hs'],
      [{gt: null, lt: 2}, 'Games with a median playtime ≤2hs']
    ])
  })

  describe('playtime_sd', () => {
    testMulti('playtime_sd', [
      [{gt: 1.25, lt: 5.25}, 'Games with a playtime standard deviation ≥1.25hs and ≤5.25hs'],
      [{gt: 3, lt: null}, 'Games with a playtime standard deviation ≥3hs'],
      [{gt: null, lt: 2}, 'Games with a playtime standard deviation ≤2hs']
    ])
  })

  describe('playtime_rsd', () => {
    testMulti('playtime_rsd', [
      [{gt: 1.25, lt: 5.25}, 'Games with a playtime relative standard deviation ≥1.25hs and ≤5.25hs'],
      [{gt: 3, lt: null}, 'Games with a playtime relative standard deviation ≥3hs'],
      [{gt: null, lt: 2}, 'Games with a playtime relative standard deviation ≤2hs']
    ])
  })

  describe('playtime_mean_ftb', () => {
    testMulti('playtime_mean_ftb', [
      [{gt: 1.25, lt: 5.25}, 'Games with an avg. playtime / price ≥1.25hs/$ and ≤5.25hs/$'],
      [{gt: 3, lt: null}, 'Games with an avg. playtime / price ≥3hs/$'],
      [{gt: null, lt: 2}, 'Games with an avg. playtime / price ≤2hs/$']
    ])
  })

  describe('playtime_median_ftb', () => {
    testMulti('playtime_median_ftb', [
      [{gt: 1.25, lt: 5.25}, 'Games with a median playtime / price ≥1.25hs/$ and ≤5.25hs/$'],
      [{gt: 3, lt: null}, 'Games with a median playtime / price ≥3hs/$'],
      [{gt: null, lt: 2}, 'Games with a median playtime / price ≤2hs/$']
    ])
  })

  describe('metacritic', () => {
    testMulti('metacritic', [
      [{gt: 10, lt: 70}, 'Games with a Metacritic ≥10 and ≤70'],
      [{gt: 90, lt: null}, 'Games with a Metacritic ≥90'],
      [{gt: null, lt: 20}, 'Games with a Metacritic ≤20']
    ])
  })

  describe('steam_reviews_count', () => {
    testMulti('steam_reviews_count', [
      [{gt: 10, lt: 70}, 'Games with ≥10 and ≤70 reviews on Steam'],
      [{gt: 90, lt: null}, 'Games with ≥90 reviews on Steam'],
      [{gt: null, lt: 20}, 'Games with ≤20 reviews on Steam']
    ])
  })

  describe('steam_reviews_ratio', () => {
    testMulti('steam_reviews_ratio', [
      [{gt: 10, lt: 70}, 'Games with a Steam reviews ratio ≥10 and ≤70'],
      [{gt: 90, lt: null}, 'Games with a Steam reviews ratio ≥90'],
      [{gt: null, lt: 20}, 'Games with a Steam reviews ratio ≤20']
    ])
  })

  describe('features', () => {
    let e = enumColumns.values.features
    testMulti('features', [
      [
        {value: e.steam_achievements, or: false},
        'Games with support for Steam Achievements'
      ],
      [
        {value: e.steam_workshop + e.steam_cloud, or: false},
        'Games with support for Steam Workshop and Steam Cloud'
      ],
      [
        {value: e.steam_workshop + e.steam_trading_cards + e.valve_anti_cheat, or: false},
        'Games with support for Steam Trading Cards, Steam Workshop and VAC (Valve Anti-Cheat)'
      ],
      [
        {value: e.steam_achievements, or: true},
        'Games with support for Steam Achievements'
      ],
      [
        {value: e.steam_workshop + e.steam_cloud, or: true},
        'Games with support for Steam Workshop or Steam Cloud'
      ],
      [
        {value: e.steam_workshop + e.steam_trading_cards + e.valve_anti_cheat, or: true},
        'Games with support for Steam Trading Cards, Steam Workshop or VAC (Valve Anti-Cheat)'
      ]
    ])
  })

  describe('platforms', () => {
    let e = enumColumns.values.platforms
    testMulti('platforms', [
      [{value: e.mac, or: false}, 'Games for Mac'],
      [{value: e.win + e.mac, or: false}, 'Games for Windows and Mac'],
      [{value: e.win + e.mac + e.linux, or: false}, 'Games for Windows, Mac and Linux/SteamOS'],
      [{value: e.mac, or: true}, 'Games for Mac'],
      [{value: e.win + e.mac, or: true}, 'Games for Windows or Mac'],
      [{value: e.win + e.mac + e.linux, or: true}, 'Games for Windows, Mac or Linux/SteamOS']
    ])
  })

  describe('players', () => {
    let e = enumColumns.values.players
    testMulti('players', [
      [{value: e.single_player, or: false}, 'Games with Single player support'],
      [{value: e.co_op + e.local_co_op, or: false}, 'Games with Co-op and Local co-op support'],
      [{value: e.multi_player + e.co_op + e.local_co_op, or: false}, 'Games with Multiplayer, Co-op and Local co-op support'],
      [{value: e.single_player, or: true}, 'Games with Single player support'],
      [{value: e.co_op + e.local_co_op, or: true}, 'Games with Co-op or Local co-op support'],
      [{value: e.multi_player + e.co_op + e.local_co_op, or: true}, 'Games with Multiplayer, Co-op or Local co-op support']
    ])
  })

  describe('vr', () => {
    let e = enumColumns.values.vr
    testMulti('vr', [
      [{value: e.vive, or: false}, 'Games with support for the HTC Vive'],
      [{value: e.vive + e.oculus, or: false}, 'Games with support for the HTC Vive and the Oculus Rift'],
      [{value: e.vive, or: true}, 'Games with support for the HTC Vive'],
      [{value: e.vive + e.oculus, or: true}, 'Games with support for the HTC Vive or the Oculus Rift']
    ])
  })

  describe('controller_support', () => {
    let e = enumColumns.values.controller_support
    testMulti('controller_support', [
      [{gt: e.partial, lt: e.partial}, 'Games with partial controller support'],
      [{gt: e.full, lt: e.full}, 'Games with full controller support'],
      [{gt: e.no, lt: e.no}, 'Games with no controller support'],
      [{gt: e.partial, lt: e.full}, 'Games with at least partial controller support'],
      [{gt: e.no, lt: e.partial}, 'Games with at most partial controller support']
    ])
  })

  describe('tags', () => {
    testMulti('tags', [
      [{tags: [1, 2, 3, 4]}, 'Games with tags <tag:1>, <tag:2>, <tag:3> and <tag:4>'],
      [{tags: [1]}, 'Games with tag <tag:1>']
    ])
  })

  describe('sysreq_index_centile', () => {
    testMulti('sysreq_index_centile', [
      [{gt: 10, lt: 70}, 'Games with a system requirements index ≥10 and ≤70'],
      [{gt: 90, lt: null}, 'Games with a system requirements index ≥90'],
      [{gt: null, lt: 20}, 'Games with a system requirements index ≤20']
    ])
  })

  describe('released_at', () => {
    testMulti('released_at', [
      [{gt: 60 * 60 * 24 * 7, lt: 0}, 'Games released in the last 1 week'],
      [{gt: 60 * 60 * 24 * 7 * 3, lt: 0}, 'Games released in the last 3 weeks'],
      [{gt: 60 * 60 * 24 * 365 * 1 / 12, lt: 0}, 'Games released in the last 1 month'],
      [{gt: 60 * 60 * 24 * 365 * 6 / 12, lt: 0}, 'Games released in the last 6 months'],
      [{gt: 60 * 60 * 24, lt: 0}, 'Games released in the last 1 day'],
      [{gt: 60 * 60 * 24 * 365, lt: 0}, 'Games released in the last 1 year'],
      [{gt: 60 * 60 * 24 * 365 * 10, lt: 0}, 'Games released in the last 10 years'],
      [{gt: null, lt: 60 * 60 * 24 * 365 * 5}, 'Games older than 5 years'],
      [{gt: 60 * 60 * 24 * 5, lt: 60 * 60 * 24}, 'Games released between 5 days and 1 day ago']
    ])
  })
})
