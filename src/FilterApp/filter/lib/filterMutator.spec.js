import { combiner, createLegacyFilter, deleteDefaultsFromMask } from './filterMutator'

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

describe('deleteDefaultsFromMask', () =>
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
    expect(deleteDefaultsFromMask(mask, {
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
