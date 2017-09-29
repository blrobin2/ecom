import test from '../../public/index'

describe('Fake test', () => {
  it('demonstrates test suite is working', () => {
    console.log = jasmine.createSpy('log')
    expect(test()).toBeTruthy()
    expect(console.log).toHaveBeenCalledWith('I was called')
  })
})