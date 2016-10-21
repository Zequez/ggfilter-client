import {
  combiner,
  deleteRedundantAttrs,
  isMaskFullyOverriden,
  removeAttrsInMask
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

describe('isMaskFullyOverriden', () => {
  it('should return true if the mask is fully overriden', () => {
    expect(isMaskFullyOverriden({
      params: {
        up: { value: 1 },
        middle: { value: 2 },
        down: { value: 3 }
      },
      sort: {
        column: 'potato',
        asc: true
      }
    }, {
      params: {
        up: { value: 2 },
        middle: true,
        down: false
      },
      sort: {
        column: 'apple',
        asc: false
      }
    })).toBe(true)
  })

  it('should return false if the mask is partially overriden', () => {
    expect(isMaskFullyOverriden({
      params: {
        up: { value: 1 },
        middle: { value: 2 },
        down: { value: 3 }
      },
      sort: {
        column: 'potato',
        asc: true
      }
    }, {
      params: {
        middle: true,
        down: false
      },
      sort: {
        column: 'apple',
        asc: false
      }
    })).toBe(false)
  })

  it('should return false if the mask is not at all overriden', () => {
    expect(isMaskFullyOverriden({
      params: {
        up: { value: 1 },
        middle: { value: 2 },
        down: { value: 3 }
      },
      sort: {
        column: 'potato',
        asc: true
      }
    }, {
      params: {
        hey: { value: 3 }
      },
      sort: {}
    })).toBe(false)
  })
})

describe('removeAttrsInMask', () => {
  it('should remove the attributes from the filter that are on the mask', () => {
    expect(removeAttrsInMask({
      params: {
        foo: {},
        bar: {},
        potato: {}
      },
      sort: {
        column: 'name',
        asc: true
      },
      masks: []
    }, {
      params: {
        foo: { value: 123 }
      },
      sort: {
        column: 'name',
        asc: false
      }
    })).toEqual({
      params: {
        bar: {},
        potato: {}
      },
      sort: {},
      masks: []
    })
  })
})
