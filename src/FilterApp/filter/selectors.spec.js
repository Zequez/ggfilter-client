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

  describe('visibleFiltersDefinitionsSelector', () => {
    it('should get the filters definitions of the visible filters in the state', () => {
      expect(visibleFiltersDefinitionsSelector({filter: {
        visible: ['name', 'steam_id']
      }})).to.deep.equal([filtersDefinitions.name, filtersDefinitions.steam_id])
    })
  })
})
