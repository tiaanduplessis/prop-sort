<h1 align="center">prop-sort</h1>
<div align="center">
  <strong>Sort array of objects based on property (supports nested properties)</strong>
</div>
<br>
<div align="center">
  <a href="https://npmjs.org/package/prop-sort">
    <img src="https://img.shields.io/npm/v/prop-sort.svg?style=flat-square" alt="Package version" />
  </a>
  <a href="https://npmjs.org/package/prop-sort">
  <img src="https://img.shields.io/npm/dm/prop-sort.svg?style=flat-square" alt="Downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/prop-sort">
    <img src="https://img.shields.io/travis/tiaanduplessis/prop-sort.svg?style=flat-square" alt="Travis Build" />
  </a>
  <a href="https://github.com/RichardLitt/standard-readme)">
    <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
  </a>
  <a href="https://badge.fury.io/gh/tiaanduplessis%2Fprop-sort">
    <img src="https://badge.fury.io/gh/tiaanduplessis%2Fprop-sort.svg?style=flat-square" alt="GitHub version" />
  </a>
  <a href="https://dependencyci.com/github/tiaanduplessis/prop-sort">
    <img src="https://dependencyci.com/github/tiaanduplessis/prop-sort/badge?style=flat-square" alt="Dependency CI" />
  </a>
  <a href="https://github.com/tiaanduplessis/prop-sort/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/prop-sort.svg?style=flat-square" alt="License" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs" />
  </a>
  <a href="https://www.paypal.me/tiaanduplessis/1">
    <img src="https://img.shields.io/badge/$-support-green.svg?style=flat-square" alt="Donate" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/prop-sort/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/prop-sort.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/prop-sort/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/prop-sort.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20prop-sort!%20https://github.com/tiaanduplessis/prop-sort%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/prop-sort.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="tiaan.beer">Tiaan</a> and <a href="https://github.com/tiaanduplessis/prop-sort/graphs/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/prop-sort.svg)](https://greenkeeper.io/)

```sh
$ npm install --save prop-sort
# OR
$ yarn add prop-sort
```

## Usage

The original array **is not mutated**.

```js
const propSort = require('prop-sort')

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

console.log(propSort(data, 'priority'))
//[ { value: 9 },
//  { value: 2, priority: 'a' },
//  { value: 2, priority: 'a' },
//  { value: 1, priority: 'c' },
//  { value: 1, priority: 'z' } ]

```

Use `dot notation` to sort by nested properties:

```js
const propSort = require('prop-sort')

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

console.log(propSort(data, 'foo.bar'))
// [ { value: 2, foo: { bar: 1 } },
//  { value: 9, foo: { bar: 5 } },
//  { value: 1, foo: { bar: 8 } },
//  { value: 2, foo: { bar: 70 } },
//  { value: 1, foo: { bar: 99 } } ]
```

Can also use own custom comparator function:

```js
const propSort = require('prop-sort')

data = [...]

propSort(data, 'property', (valueOfFirstProperty, valueOfSecondProperty) => {
	//...
})

```

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Licensed under the MIT License.
