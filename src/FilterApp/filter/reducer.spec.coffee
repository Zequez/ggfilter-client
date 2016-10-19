import sinon from 'sinon'
import games from '../games'

import {
  MUTATE,
  autoToggle,
  setParam,
  reducer
} from './reducer'
# injector = require('inject?../config/defaultFilterDelta!./reducer')

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

      inject = (files, cb) ->
        for key of files
          fil

      it 'should remove things that are already present in the default filter', ->
        sinon.test ->
          this.stub require('../config/defaultFilterDelta'), 'default',
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
    describe '.autoToggle', ->
      it 'should dispatch a mutation to show the param', ->
        dispatch = sinon.stub()
        asyncAction(
          autoToggle('potato'),
          {params: {potato: false}},
          dispatch
        )

        expect(dispatch.getCall(0).args[0]).to.deep.equal({
          type: MUTATE
          mask: { params: { potato: true } }
          dispatch: getGamesResult
        })

      it 'should dispatch a mutation to hide the param', ->
        dispatch = sinon.stub()
        asyncAction(
          autoToggle('potato'),
          {params: {potato: {value: 'woah'}}},
          dispatch
        )

        expect(dispatch.getCall(0).args[0]).to.deep.equal({
          type: MUTATE
          mask: { params: { potato: false } }
          dispatch: getGamesResult
        })

    describe '.setParam', ->
      it 'should return a mutation action to show the param', ->
        expect(setParam('potato', true)).to.deep.equal({
          type: MUTATE
          mask: { params: { potato: true } }
          dispatch: getGamesResult
        })
      it 'should return a mutation to hide the param', ->
        expect(setParam('potato', false)).to.deep.equal({
          type: MUTATE,
          mask: { params: { potato: false } }
          dispatch: getGamesResult
        })
      it 'should return a mutation to set the param to any value', ->
        expect(setParam('potato', {value: 'whoa'})).to.deep.equal({
          type: MUTATE,
          mask: { params: { potato: {value: 'whoa'} } }
          dispatch: getGamesResult
        })

    describe '.addTagFilter', ->

    # expect(mutate({params: { yes }})).to.eq(true)
