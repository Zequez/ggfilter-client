import {
  filterSelector,
  plusFilterSelector,
  visibleFiltersDefinitionsSelector } from './selectors'
import filtersDefinitions from '../config/filtersDefinitions'

describe('FilterApp/filter selectors', () => {
  describe('filterSelector', () => {
    it('should get the current filter from the state', () => {
      expect(filterSelector({filter: {potatoSalad: true}}))
        .to.deep.equal({potatoSalad: true})
    })
  })

  describe('plusFilterSelector', () => {
    it('should get the current filter with extra params', () => {
      expect(plusFilterSelector({filter: {
        visible: ['name', 'steam_reviews_ratio', 'steam_reviews_count'],
        params: {
          name: { value: 'civ' }
        },
        sort: 'name',
        sortAsc: false
      }})).to.deep.equal({
        visible: ['name', 'steam_reviews_ratio', 'steam_reviews_count'],
        params: {
          name: { value: 'civ' },
          steam_reviews_count: { gt: 65 },
          steam_reviews_ratio: { gt: 95 }
        },
        sort: 'name',
        sortAsc: false
      })
    })
  })

  describe('visibleFiltersDefinitionsSelector', () => {
    it('should get the filters definitions of the visible filters in the state', () => {
      expect(visibleFiltersDefinitionsSelector({filter: {
        visible: ['name', 'steam_id']
      }})).to.deep.equal([filtersDefinitions.name, filtersDefinitions.steam_id])
    })
  })
})
