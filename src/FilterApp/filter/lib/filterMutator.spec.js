import {
  combiner,
  createLegacyFilter,
  deleteRedundantAttrs,
  isMaskActive,
  reverseFilter
} from './filterMutator'

let defaultFilter = {
  params: {
    steam_id: true,
    name: 'Potato',
    steam_reviews_count: true,
    steam_reviews_ratio: { gt: 70 },
    players: true,
    vr: true,
    platforms: true
  },
  sort: {
    column: 'name',
    asc: true
  }
}

let decrapify = {
  params: {
    steam_reviews_count: { gt: 65 },
    steam_reviews_ratio: { gt: 95 }
  }
}

let playtimeForTheBuck = {
  params: {
    playtime_median_ftb: { gt: 1.5 }
  },
  sort: {
    column: 'playtime_median_ftb',
    asc: false
  }
}

let nonImportantColumns = {
  params: {
    steam_id: false,
    players: false,
    vr: false,
    platforms: false
  }
}

describe('filterCombiner', () => {
  it('should return a new filter', () => {
    let a = {params: {foo: 'bar'}, sort: {}}
    let b = {params: {foo: 'zoo'}, sort: {}}
    let c = combiner(a, b)
    expect(c).not.toBe(a)
    expect(c).not.toBe(b)
  })

  it('should set new values for params', () =>
    expect(combiner(defaultFilter, decrapify))
    .toEqual({
      params: {
        steam_id: true,
        name: 'Potato',
        steam_reviews_count: { gt: 65 },
        steam_reviews_ratio: { gt: 95 },
        players: true,
        vr: true,
        platforms: true
      },
      sort: {
        column: 'name',
        asc: true
      }
    })
  )

  it('should set new columns and new values for sort', () =>
    expect(combiner(defaultFilter, decrapify, playtimeForTheBuck))
    .toEqual({
      params: {
        steam_id: true,
        name: 'Potato',
        steam_reviews_count: { gt: 65 },
        steam_reviews_ratio: { gt: 95 },
        players: true,
        vr: true,
        platforms: true,
        playtime_median_ftb: { gt: 1.5 }
      },
      sort: {
        column: 'playtime_median_ftb',
        asc: false
      }
    })
  )

  it('should allow you to disable columns', () =>
    expect(combiner(defaultFilter, decrapify, playtimeForTheBuck, nonImportantColumns))
    .toEqual({
      params: {
        steam_id: false,
        name: 'Potato',
        steam_reviews_count: { gt: 65 },
        steam_reviews_ratio: { gt: 95 },
        players: false,
        vr: false,
        platforms: false,
        playtime_median_ftb: { gt: 1.5 }
      },
      sort: {
        column: 'playtime_median_ftb',
        asc: false
      }
    })
  )
})

describe('createLegacyFilter', () =>
  it('should convert a new filter format to the old filter format', () =>
    expect(createLegacyFilter({
      params: {
        steam_id: false,
        name: { value: 'Potato' },
        steam_reviews_count: { gt: 65 },
        steam_reviews_ratio: { gt: 95 },
        players: false,
        vr: false,
        platforms: false,
        playtime_median_ftb: { gt: 1.5 }
      },
      sort: {
        column: 'playtime_median_ftb',
        asc: false
      }
    })).toEqual({
      visible: [
        'steam_id',
        'name',
        'steam_reviews_count',
        'steam_reviews_ratio',
        'players',
        'vr',
        'platforms',
        'playtime_median_ftb'
      ],
      params: {
        name: { value: 'Potato' },
        steam_reviews_count: { gt: 65 },
        steam_reviews_ratio: { gt: 95 },
        playtime_median_ftb: { gt: 1.5 }
      },
      sort: 'playtime_median_ftb',
      sortAsc: false
    })
  )
)

describe('deleteRedundantAttrs', () =>
  it("should remove stuff that it's part of the default from the mask", () => {
    let mask = {
      params: {
        steam_id: false,
        name: { value: 'Potato' },
        steam_reviews_count: false,
        steam_reviews_ratio: { gt: 50 },
        vr: true
      },
      sort: {
        column: 'playtime_median_ftb',
        asc: true
      }
    }
    expect(deleteRedundantAttrs(mask, {
      params: {
        steam_id: false,
        name: { value: 'Potato' },
        steam_reviews_count: { gt: 65 },
        steam_reviews_ratio: { gt: 95 },
        players: false,
        vr: false,
        platforms: false,
        playtime_median_ftb: { gt: 1.5 }
      },
      sort: {
        column: 'playtime_median_ftb',
        asc: false
      }
    }))

    expect(mask).toEqual({
      params: {
        steam_reviews_count: false,
        steam_reviews_ratio: { gt: 50 },
        vr: true
      },
      sort: {
        asc: true
      }
    })
  })
)

describe('isMaskActive', () => {
  let fun = isMaskActive

  describe('with one key to match', () => {
    it('should return true for equal objects', () =>
      expect(fun({potato: 1}, {potato: 1})).toBe(true))
    it('should return true for matched keys', () =>
      expect(fun({potato: 1, other: 2}, {potato: 1})).toBe(true))
    it('should return false for different key values', () =>
      expect(fun({potato: 1}, {potato: 2})).toBe(false))
    it('should return false for different keys', () =>
      expect(fun({other: 1}, {potato: 1})).toBe(false))
  })

  describe('with multiple keys to match', () => {
    it('should return true for matched keys', () =>
      expect(fun({potato: 1, salad: 2, other: 2}, {potato: 1, salad: 2})).toBe(true))
    it('should return false if one of the key values do not match', () =>
      expect(fun({potato: 1, salad: 0, other: 2}, {potato: 1, salad: 2})).toBe(false))
    it('should return false if one of the key is not there', () =>
      expect(fun({potato: 1, other: 2}, {potato: 1, salad: 2})).toBe(false))
  })

  describe('with objects with values', () => {
    it('should return true for matched values', () =>
      expect(fun({potato: {hey: 123}, other: 2}, {potato: {hey: 123}})).toBe(true))
    it('should return false for non matched values', () =>
      expect(fun({potato: {hey: 666}, other: 2}, {potato: {hey: 123}})).toBe(false))
    it('should NOT match this real life object', () => {
      let store = {'visible': ['steam_id', 'name', 'released_at', 'tags', 'lowest_steam_price', 'steam_discount', 'playtime_median', 'playtime_median_ftb', 'steam_reviews_count', 'steam_reviews_ratio', 'platforms', 'players', 'vr'], 'params': {'steam_reviews_count': {'gt': 65}, 'steam_reviews_ratio': {'gt': 95}, 'playtime_median_ftb': {'gt': 1.5}}, 'sort': 'lowest_steam_price', 'sortAsc': true}
      let shortcut = {'params': {'playtime_median_ftb': {'gt': 1.5}}, 'sort': 'playtime_median_ftb', 'sortAsc': false}
      return expect(fun(store, shortcut)).toBe(false)
    })
  })
})

describe('reverseFilter', () => {
  it('should false any truthy values', () => {

  })
})
