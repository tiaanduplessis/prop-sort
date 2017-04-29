/* eslint-env jest */
'use strict'

const propSort = require('./')

test('should export function', () => {
  expect(propSort).toBeDefined()
  expect(typeof propSort).toBe('function')
})

test('should sort on non nested property', () => {
  const data = [
    {
      value: 1,
      priority: 'c'
    },
    {
      value: 2,
      priority: 'a'
    },
    {
      value: 9
    },
    {
      value: 1,
      priority: 'z'
    },
    {
      value: 2,
      priority: 'a'
    }
  ]

  const result = [ { value: 9 },
    { value: 2, priority: 'a' },
    { value: 2, priority: 'a' },
    { value: 1, priority: 'c' },
    { value: 1, priority: 'z' } ]

  expect(propSort(data, 'priority')).toEqual(result)
})

test('should sort on non nested property', () => {
  const data = [
    {
      value: 1,
      foo: {
        bar: 8
      }
    },
    {
      value: 2,
      foo: {
        bar: 1
      }
    },
    {
      value: 9,
      foo: {
        bar: 5
      }
    },
    {
      value: 1,
      foo: {
        bar: 99
      }
    },
    {
      value: 2,
      foo: {
        bar: 70
      }
    }
  ]

  const result = [ { value: 2, foo: { bar: 1 } },
    { value: 9, foo: { bar: 5 } },
    { value: 1, foo: { bar: 8 } },
    { value: 2, foo: { bar: 70 } },
    { value: 1, foo: { bar: 99 } } ]

  expect(propSort(data, 'foo.bar')).toEqual(result)
})
