/* eslint-env jest */
'use strict'

const mergeWith = require('lodash/mergeWith')
const unset = require('lodash/unset')
const omit = require('lodash/omit')
const template = require('lodash/template')
const fromPairs = require('lodash/fromPairs')
const babelMerge = require('babel-core/lib/helpers/merge')

// Synthetic development-dependency probes, not exploits through prop-sort.
// Prototype probes use private fixtures and leave built-in prototypes untouched.
test('mergeWith leaves a private object prototype unchanged', () => {
  const prototype = { sentinel: 'preserved' }
  const destination = Object.create(prototype)
  mergeWith(destination, JSON.parse('{"__proto__":{"sentinel":"changed"}}'))
  expect(prototype.sentinel).toBe('preserved')
})

test('mergeWith leaves a private constructor prototype unchanged', () => {
  function Fixture () {}
  mergeWith({ constructor: Fixture }, { constructor: { prototype: { sentinel: true } } })
  expect(Object.prototype.hasOwnProperty.call(Fixture.prototype, 'sentinel')).toBe(false)
})

test('Babel option merging leaves a private constructor prototype unchanged', () => {
  function Fixture () {}
  babelMerge({ constructor: Fixture }, { constructor: { prototype: { sentinel: true } } })
  expect(Object.prototype.hasOwnProperty.call(Fixture.prototype, 'sentinel')).toBe(false)
})

const paths = [
  { label: 'string', path: 'constructor.prototype.sentinel' },
  { label: 'array-wrapped', path: [['constructor'], ['prototype'], 'sentinel'] }
]

paths.forEach(({ label, path }) => {
  test(`unset preserves a private prototype sentinel for ${label} paths`, () => {
    function Fixture () {}
    Fixture.prototype.sentinel = 'preserved'
    unset({ constructor: Fixture }, path)
    expect(Fixture.prototype.sentinel).toBe('preserved')
  })

  test(`omit preserves a private prototype sentinel for ${label} paths`, () => {
    function Fixture () {}
    Fixture.prototype.sentinel = 'preserved'
    omit({ constructor: Fixture }, [path])
    expect(Fixture.prototype.sentinel).toBe('preserved')
  })
})

test('template rejects a variable containing a harmless default expression', () => {
  expect(() => template('fixture', { variable: 'data = 1' })).toThrow()
})

test('template rejects an imports key containing a harmless default expression', () => {
  expect(() => template('fixture', { imports: { 'entry = 1': 1 } })).toThrow()
})

test('modular template handles ordinary interpolation and imports', () => {
  const render = template('<%= label(data.name) %>', {
    variable: 'data', imports: { label: name => `Hello ${name}` }
  })
  expect(render({ name: 'fixture' })).toBe('Hello fixture')
})

test('modular fromPairs creates an ordinary object', () => {
  expect(fromPairs([['name', 'fixture'], ['count', 2]])).toEqual({ name: 'fixture', count: 2 })
})

test('Babel option merging preserves nested values and deduplicates arrays', () => {
  const destination = { nested: { left: true }, items: ['existing', 'shared'] }
  const source = { nested: { right: true }, items: ['incoming', 'shared'] }
  expect(babelMerge(destination, source)).toEqual({
    nested: { left: true, right: true }, items: ['incoming', 'shared', 'existing']
  })
  expect(source).toEqual({ nested: { right: true }, items: ['incoming', 'shared'] })
})
