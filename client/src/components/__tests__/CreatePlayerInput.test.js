import React from 'react'
import { shallow } from 'enzyme'

import CreatePlayerInput from '../CreatePlayerInput'

let wrapped

beforeEach(() => {
  wrapped = shallow(<CreatePlayerInput />)
})

it('shows a form', () => {
  expect(wrapped.find('form').length).toEqual(1)
})

describe('the form', () => {
  beforeEach(() => {
    wrapped.find('[type="text"]').simulate('change', { target: { value: 'Mary' } })

    wrapped.update()
  })

  it('has an input that user can type in', () => {
    expect(wrapped.find('[type="text"]').props().value).toEqual('Mary')
  })
})
