import enumColumns from 'sources/enumColumns'
import { timeInWords } from 'lib/utils'

let p = (cents) => {
  if (cents === 1) return '$0.01'
  if (cents === 0) return 'Free'
  return '$' + Math.floor(cents / 100)
}

let basicRange = (rangeInterpol, gtInterpol, ltInterpol, equalInterpol = '') => {
  return function ({gt, lt}) {
    if (gt == null && lt == null) return ''
    if (gt === lt) return equalInterpol.replace('{gt}', gt)
    if (gt != null && lt == null) return gtInterpol.replace('{gt}', gt)
    if (gt == null && lt != null) return ltInterpol.replace('{lt}', lt)
    if (gt != null && lt != null) return rangeInterpol.replace('{gt}', gt).replace('{lt}', lt)
  }
}

let booleanFilter = (nameKey, wholeInterpol = '%s', valInterpol = '%s') => {
  return function ({value, or}) {
    let values = enumColumns.values[nameKey]
    let names = enumColumns.names[nameKey]

    let selectedNames = []

    for (let key in values) {
      if (values[key] & value) {
        selectedNames.push(valInterpol.replace('%s', names[key]))
      }
    }

    let textNames = ''
    if (selectedNames.length > 1) {
      let lastName = selectedNames.pop()
      textNames = selectedNames.join(', ') + (or ? ' or ' : ' and ') + lastName
    } else if (selectedNames.length === 1) {
      textNames = selectedNames[0]
    } else {
      return ''
    }

    return wholeInterpol.replace('%s', textNames)
  }
}

export default {
  name: ({value}) => ['with the name "%s"', value],
  steam_id: ({value}) => ['with the Steam ID %s', value],
  lowest_steam_price: ({gt, lt}) => {
    if (lt === 0 && gt === 0) {
      return `free on Steam`
    } else if (gt === 1 && lt == null) {
      return `non-free on Steam`
    } else if (gt != null && lt != null) {
      return `with a price ≥${p(gt)} and ≤${p(lt)} on Steam`
    } else if (gt != null && lt == null) {
      return `with a price ≥${p(gt)} on Steam`
    } else if (gt == null && lt != null) {
      return `with a price ≤${p(lt)} on Steam`
    }
  },
  steam_discount: ({gt, lt}) => {
    if (lt === 0 && gt === 0) {
      return `that aren't on sale on Steam`
    } else if (gt === 1 && lt == null) {
      return `on sale on Steam`
    } else if (gt === 100 && lt === 100) {
      return `with 100% discount given away for FREE on Steam`
    } else if (gt === 1 && lt != null) {
      return `on sale on Steam with a discount ≤${lt}%`
    } else if (gt != null && lt != null) {
      return `on sale on Steam with a discount ≥${gt}% and ≤${lt}%`
    } else if (gt != null && lt == null) {
      return `on sale on Steam with a discount ≥${gt}%`
    } else if (gt == null && lt != null) {
      return `with a discount ≤${lt}% on Steam`
    }
  },
  playtime_mean: basicRange(
    'with an average playtime ≥{gt}hs and ≤{lt}hs',
    'with an average playtime ≥{gt}hs',
    'with an average playtime ≤{lt}hs'
  ),
  playtime_median: basicRange(
    'with a median playtime ≥{gt}hs and ≤{lt}hs',
    'with a median playtime ≥{gt}hs',
    'with a median playtime ≤{lt}hs'
  ),
  playtime_sd: basicRange(
    'with a playtime standard deviation ≥{gt}hs and ≤{lt}hs',
    'with a playtime standard deviation ≥{gt}hs',
    'with a playtime standard deviation ≤{lt}hs'
  ),
  playtime_rsd: basicRange(
    'with a playtime relative standard deviation ≥{gt}hs and ≤{lt}hs',
    'with a playtime relative standard deviation ≥{gt}hs',
    'with a playtime relative standard deviation ≤{lt}hs'
  ),
  playtime_mean_ftb: basicRange(
    'with an avg. playtime / price ≥{gt}hs/$ and ≤{lt}hs/$',
    'with an avg. playtime / price ≥{gt}hs/$',
    'with an avg. playtime / price ≤{lt}hs/$'
  ),
  playtime_median_ftb: basicRange(
    'with a median playtime / price ≥{gt}hs/$ and ≤{lt}hs/$',
    'with a median playtime / price ≥{gt}hs/$',
    'with a median playtime / price ≤{lt}hs/$'
  ),
  metacritic: basicRange(
    'with a Metacritic ≥{gt} and ≤{lt}',
    'with a Metacritic ≥{gt}',
    'with a Metacritic ≤{lt}'
  ),
  steam_reviews_count: basicRange(
    'with ≥{gt} and ≤{lt} reviews on Steam',
    'with ≥{gt} reviews on Steam',
    'with ≤{lt} reviews on Steam'
  ),
  steam_reviews_ratio: basicRange(
    'with a Steam reviews ratio ≥{gt}% and ≤{lt}%',
    'with a Steam reviews ratio ≥{gt}%',
    'with a Steam reviews ratio ≤{lt}%'
  ),
  features: booleanFilter('features', 'with support for %s'),
  platforms: booleanFilter('platforms', 'for %s'),
  players: booleanFilter('players', 'with %s support'),
  vr: booleanFilter('vr', 'with support for %s', 'the %s'),
  controller_support: ({gt, lt}) => {
    let v = enumColumns.values.controller_support
    if (gt === v.no && lt === v.no) return 'with no controller support'
    if (gt === v.partial && lt === v.partial) return 'with partial controller support'
    if (gt === v.full && lt === v.full) return 'with full controller support'
    if (gt === v.partial && lt === v.full) return 'with at least partial controller support'
    if (gt === v.no && lt === v.partial) return 'with at most partial controller support'
    return ''
  },
  tags: ({tags}, store) => {
    tags = tags.map((id) => store.tags[id])
    if (tags.length > 1) {
      let lastTag = tags.pop()
      return 'tagged as ' + tags.join(', ') + ' and ' + lastTag
    } else if (tags.length === 1) {
      return 'tagged as ' + tags[0]
    } else {
      return ''
    }
  },
  sysreq_index_centile: basicRange(
    'with a system requirements index ≥{gt} and ≤{lt}',
    'with a system requirements index ≥{gt}',
    'with a system requirements index ≤{lt}'
  ),
  released_at: ({gt, lt}) => {
    if (lt === 0 && gt != null) {
      return 'released in the last ' + timeInWords(gt)
    } else if (lt != null && gt == null) {
      return 'older than ' + timeInWords(lt)
    } else if (lt != null && gt != null) {
      return 'released between ' + timeInWords(gt) + ' and ' + timeInWords(lt) + ' ago'
    }
  }
}
