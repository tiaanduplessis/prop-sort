'use strict'

const get = require('get-value')

/**
 * Default comparator function for sort
 * @param {Any} val1
 * @param {Any} val2
 */
function defaultComparator (val1 = '', val2 = '') {
  if (typeof val1 === 'number' && typeof val2 === 'number') { return val1 - val2 }

  val1 = val1.toString()
  val2 = val2.toString()

  if (val1 === val2) {
    return 0
  }

  return (val1.toString() > val2.toString()) ? 1 : -1
}

/**
 * Sort array of objects based on property
 * @param {Array} arr
 * @param {String} prop
 * @param {Function} comparator
 */
module.exports = function (arr = [], prop, comparator = defaultComparator) {
  if (!prop) {
    throw new Error('Property needed to compare on')
  }

  return arr.slice().sort((obj1, obj2) => {
    const val1 = get(obj1, prop)
    const val2 = get(obj2, prop)
    return comparator(val1, val2)
  })
}
