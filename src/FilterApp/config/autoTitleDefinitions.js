import enumColumns from './enumColumns'
import { timeInWords, formatShortDate, escapeHtml as h } from 'shared/lib/utils'

let p = (cents) => {
  cents = parseInt(cents)
  if (cents === 1) return '0.01'
  if (cents === 0) return 'Free'
  return Math.floor(cents / 100)
}

let basicRange = (rangeInterpol, gtInterpol, ltInterpol, equalInterpol = '') => {
  return function ({gt, lt}) {
    if (gt == null && lt == null) return ''
    if (gt === lt) return equalInterpol.replace('{gt}', h(gt))
    if (gt != null && lt == null) return gtInterpol.replace('{gt}', h(gt))
    if (gt == null && lt != null) return ltInterpol.replace('{lt}', h(lt))
    if (gt != null && lt != null) return rangeInterpol.replace('{gt}', h(gt)).replace('{lt}', h(lt))
  }
}

let booleanFilter = (nameKey, wholeInterpol = '%s', valInterpol = '%s') => {
  return function ({value, or}) {
    let values = enumColumns.values[nameKey]
    let names = enumColumns.names[nameKey]

    let selectedNames = []

    for (let key in values) {
      if (values[key] & value) {
        selectedNames.push(valInterpol.replace('%s', '<' + h(names[key]) + '>'))
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
  platforms: booleanFilter('platforms', 'for %s'),
  vr_platforms: booleanFilter('vr_platforms', 'for %s', 'the %s'),
  vr_mode: booleanFilter('vr_mode', 'for %s VR'),
  vr_controllers: booleanFilter('vr_controllers', 'with %s VR controllers support'),
  players: booleanFilter('players', 'with %s support'),
  features: booleanFilter('features', 'with support for %s'),
  controller_support: ({gt, lt}) => {
    let v = enumColumns.values.controller_support
    if (gt === v.no && lt === v.no) return 'with <no controller support>'
    if (gt === v.partial && lt === v.partial) return 'with <only partial controller support>'
    if (gt === v.full && lt === v.full) return 'with <full controller support>'
    if (gt === v.partial && lt === v.full) return 'with <partial or full controller support>'
    if (gt === v.no && lt === v.partial) return 'with <partial or no controller support>'
    return ''
  },
  name: ({value}) => `with the name <"${h(value)}">`,
  steam_id: ({value}) => `with the Steam ID <${h(value)}>`,
  lowest_steam_price: ({gt, lt}) => {
    if (lt === 0 && gt === 0) {
      return `<free> on Steam`
    } else if (gt === 1 && lt == null) {
      return `<non-free> on Steam`
    } else if (gt != null && lt == null) {
      return `with a price <≥$${p(gt)}> on Steam`
    } else if ((gt == null || gt === 0) && lt != null) {
      return `with a price <≤$${p(lt)}> on Steam`
    } else if (gt != null && lt != null) {
      return `with a price of <$${p(gt)}-${p(lt)}> on Steam`
    }
  },
  steam_discount: ({gt, lt}) => {
    if (lt === 0 && gt === 0) {
      return `that <aren't on sale> on Steam`
    } else if (gt === 1 && lt == null) {
      return `<on sale> on Steam`
    } else if (gt === 100 && lt === 100) {
      return `with <100% discount given away for FREE> on Steam`
    } else if (gt === 1 && lt != null) {
      return `<on sale> on Steam with a discount <≤${h(lt)}%>`
    } else if (gt != null && (lt == null || lt === 100)) {
      return `<on sale> on Steam with a discount <≥${h(gt)}%>`
    } else if ((gt == null || gt === 0) && lt != null) {
      return `with a discount <≤${h(lt)}%> on Steam`
    } else if (gt != null && lt != null) {
      return `<on sale> on Steam with a discount of <${h(gt)}-${h(lt)}%>`
    }
  },
  playtime_mean: basicRange(
    'with an average playtime of <{gt}-{lt}hs>',
    'with an average playtime <≥{gt}hs>',
    'with an average playtime <≤{lt}hs>'
  ),
  playtime_median: basicRange(
    'with a median playtime of <{gt}-{lt}hs>',
    'with a median playtime <≥{gt}hs>',
    'with a median playtime <≤{lt}hs>'
  ),
  playtime_sd: basicRange(
    'with a playtime standard deviation of <{gt}-{lt}hs>',
    'with a playtime standard deviation <≥{gt}hs>',
    'with a playtime standard deviation <≤{lt}hs>'
  ),
  playtime_rsd: basicRange(
    'with a playtime relative standard deviation of <{gt}-{lt}hs>',
    'with a playtime relative standard deviation <≥{gt}hs>',
    'with a playtime relative standard deviation <≤{lt}hs>'
  ),
  playtime_mean_ftb: basicRange(
    'with an avg. playtime / price of <{gt}-{lt}hs/$>',
    'with an avg. playtime / price <≥{gt}hs/$>',
    'with an avg. playtime / price <≤{lt}hs/$>'
  ),
  playtime_median_ftb: basicRange(
    'with a median playtime / price of <{gt}-{lt}hs/$>',
    'with a median playtime / price <≥{gt}hs/$>',
    'with a median playtime / price <≤{lt}hs/$>'
  ),
  metacritic: basicRange(
    'with a Metacritic of <{gt}-{lt}>',
    'with a Metacritic <≥{gt}>',
    'with a Metacritic <≤{lt}>'
  ),
  steam_reviews_count: basicRange(
    'with <{gt}-{lt}> reviews on Steam',
    'with <≥{gt}> reviews on Steam',
    'with <≤{lt}> reviews on Steam'
  ),
  steam_reviews_ratio: basicRange(
    'with a Steam reviews ratio of <{gt}-{lt}%>',
    'with a Steam reviews ratio <≥{gt}%>',
    'with a Steam reviews ratio <≤{lt}%>'
  ),
  tags: ({tags}, filter) => {
    tags = tags.map((id) => '<' + h(filter.columnOptions.tags[id]) + '>')
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
    'with a system requirements index of <{gt}-{lt}>',
    'with a system requirements index <≥{gt}>',
    'with a system requirements index <≤{lt}>'
  ),
  released_at: ({gt, lt}) => {
    if (gt === 0 && lt == null) {
      return '<unreleased>'
    } else if (lt === 0 && gt != null) {
      return `released in the <last ${h(timeInWords(gt, false))}>`
    } else if (lt != null && gt == null) {
      return `<older than ${h(timeInWords(lt))}>`
    } else if (lt != null && gt != null) {
      return `released between <${h(timeInWords(gt))} and ${h(timeInWords(lt))} ago>`
    } else {
      return ''
    }
  },
  released_at_absolute: ({gt, lt}) => {
    return `release date`
  },
  steam_early_access: ({value}) => value ? '<early access>' : '<non early access>'
}
