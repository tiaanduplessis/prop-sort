/* eslint-env jest */
'use strict'

const propSort = require('./')

test('should export function', () => {
  expect(propSort).toBeDefined()
  expect(typeof propSort).toBe('function')
})

test('should sort on a top-level string property', () => {
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

test('should sort on a nested numeric property', () => {
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

test('returns a shallow copy without mutating the array or its objects', () => {
  const first = Object.freeze({ rank: 2 })
  const second = Object.freeze({ rank: 1 })
  const data = Object.freeze([first, second])
  const result = propSort(data, 'rank')

  expect(result).not.toBe(data)
  expect(result).toEqual([second, first])
  expect(result[0]).toBe(second)
  expect(result[1]).toBe(first)
  expect(data).toEqual([first, second])
})

test('sorts negative, zero and fractional numbers numerically', () => {
  const data = [10, -2, 0, 1.5, -10].map(rank => ({ rank }))

  expect(propSort(data, 'rank').map(item => item.rank)).toEqual([-10, -2, 0, 1.5, 10])
})

test('passes selected nested values to a custom descending comparator', () => {
  const data = [2, 10, 1].map(rank => ({ details: { rank } }))
  const compared = []
  const result = propSort(data, 'details.rank', (left, right) => {
    compared.push(left, right)
    return right - left
  })

  expect(result.map(item => item.details.rank)).toEqual([10, 2, 1])
  expect(compared.length).toBeGreaterThan(0)
  expect(compared.every(value => typeof value === 'number')).toBe(true)
  expect(data.map(item => item.details.rank)).toEqual([2, 10, 1])
})

test('lets a custom comparator handle missing nested properties', () => {
  const missing = { id: 'missing' }
  const data = [{ details: { rank: 2 } }, missing, { details: { rank: 1 } }]
  const result = propSort(data, 'details.rank', (left, right) => {
    if (left === undefined) return 1
    if (right === undefined) return -1
    return left - right
  })

  expect(result).toEqual([data[2], data[0], missing])
})

test('treats missing nested properties as empty strings by default', () => {
  const missingParent = { id: 'missing-parent' }
  const missingChild = { details: {}, id: 'missing-child' }
  const data = [{ details: { name: 'z' } }, missingParent, { details: { name: 'a' } }, missingChild]
  const result = propSort(data, 'details.name')

  expect(result.slice(0, 2)).toContain(missingParent)
  expect(result.slice(0, 2)).toContain(missingChild)
  expect(result.slice(2)).toEqual([data[2], data[0]])
})

test('returns a new empty array without invoking the comparator', () => {
  const data = []
  const comparator = () => { throw new Error('Unexpected comparison') }
  const result = propSort(data, 'rank', comparator)

  expect(result).toEqual([])
  expect(result).not.toBe(data)
  expect(propSort(undefined, 'rank')).toEqual([])
})

test('requires a property even for an empty array', () => {
  expect(() => propSort()).toThrow('Property needed to compare on')
  expect(() => propSort([], '')).toThrow('Property needed to compare on')
})

test('uses the runtime native sort ordering for equal keys', () => {
  // Older supported runtimes do not guarantee a stable Array#sort.
  const data = Array.from({ length: 24 }, (value, id) => ({ id, rank: id % 3 }))
  const expected = data.slice().sort((left, right) => left.rank - right.rank)

  expect(propSort(data, 'rank')).toEqual(expected)
  expect(propSort(data, 'rank', () => 0)).toEqual(data.slice().sort(() => 0))
})
