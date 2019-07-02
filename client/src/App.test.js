import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import CreatePlayerInput from './components/CreatePlayerInput'
import PlayerSelectContainer from './components/PlayerSelectContainer'

let wrapped

beforeEach(() => {
  wrapped = shallow(<App />)
})

it('shows a header', () => {
  expect(wrapped.find('header').length).toEqual(1)
  expect(wrapped.find('h2').text()).toEqual('Pool Scoreboard')
})

it('shows a create player input', () => {
  expect(wrapped.find(CreatePlayerInput).length).toEqual(1)
})

it('shows a player select container', () => {
  expect(wrapped.find(PlayerSelectContainer).length).toEqual(1)
})
