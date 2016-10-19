import sinon from 'sinon'
import games from '../games'

import {
  MUTATE,
  autoToggle,
  setParam,
  reducer
} from './reducer'

getGamesResult = 'does not matter'
sinon.stub(games, 'getGames').returns(getGamesResult)

asyncAction = (actionResult, state, dispatch = ->) ->
  getState = -> state
  actionResult(dispatch, getState)

describe 'FilterApp/filter reducer', ->
  describe 'reducer', ->
    describe MUTATE, ->
      initialState =
        params:
          foo: {bar: true}
          galaxy: {bar: 'rsa'}
        sort:
          column: 'steam_id'
          asc: true

      it 'should update the state normally', ->
        sinon.test ->
          this.stub require('../config/defaultFilter'), 'default',
            params: {}
            sort: {}

          expect(reducer(initialState, { type: MUTATE, mask: {
            params:
              foo: {pen: 'cuck'}
              potato: {value: true}
            sort:
              column: 'name'
          }}))
          .to.deep.equal({
            params:
              foo: {pen: 'cuck'}
              galaxy: {bar: 'rsa'}
              potato: {value: true}
            sort:
              column: 'name'
              asc: true
          })

      it 'should remove things that are already present in the default filter', ->
        sinon.test ->
          this.stub require('../config/defaultFilter'), 'default',
            params:
              foo: { pen: 'cuck' }
              potato: { value: true }
            sort:
              column: 'name'
              asc: false

          expect(reducer(initialState, { type: MUTATE, mask: {
            params:
              foo: {pen: 'cuck'}
              potato: {value: true}
            sort:
              column: 'name'
          }}))
          .to.deep.equal({
            params:
              galaxy: {bar: 'rsa'}
            sort:
              asc: true
          })



  describe 'action creators', ->
    describe '.setParam', ->
      it 'should return a mutation action to show the param', ->
        expect(setParam('potato', true)).to.deep.equal({
          type: MUTATE
          mask: { params: { potato: true } }
        })
      it 'should return a mutation to hide the param', ->
        expect(setParam('potato', false)).to.deep.equal({
          type: MUTATE,
          mask: { params: { potato: false } }
        })
      it 'should return a mutation to set the param to any value', ->
        expect(setParam('potato', {value: 'whoa'})).to.deep.equal({
          type: MUTATE,
          mask: { params: { potato: {value: 'whoa'} } }
        })

    describe '.addTagFilter', ->

    # expect(mutate({params: { yes }})).to.eq(true)
