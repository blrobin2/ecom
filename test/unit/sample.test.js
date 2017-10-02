import test from '../../public/index'
import { assert } from 'chai'
import { spy } from 'sinon'

describe('Fake test', () => {
  it('demonstrates test suite is working', () => {
    const log = spy(console, 'log')
    assert.isTrue(test())
    assert(log.calledWith('I was called'))
  })
})