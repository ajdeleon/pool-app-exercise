import React from 'react'
import { mount } from 'enzyme'

import PlayerSelectContainer from '../PlayerSelectContainer'

const props = {
  players: [{name: 'AJ', wins: 2 }, {name: 'Bob', wins: 3}]
}

let wrapped
beforeEach(() => {
  wrapped = mount(<PlayerSelectContainer {...props} />)
})

afterEach(() => {
  wrapped.unmount()
})

it('contains two select elements and two buttons', () => {
  expect(wrapped.find('select').length).toEqual(2)
  expect(wrapped.find('button').length).toEqual(2)
})

describe('the select elements', () => {
  beforeEach(() => {
    wrapped.find('select').at(0).simulate('change', {
      target: { value: 'AJ' }
    })

    wrapped.find('select').at(1).simulate('change', {
      target: { value: 'Bob' }
    })
    wrapped.update()
  })

  it('have selecteable options',() => {
    expect(wrapped.find('select').at(0).props().value).toEqual('AJ')
    expect(wrapped.find('select').at(1).props().value).toEqual('Bob')
  })
})
