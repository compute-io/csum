csum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative sum of a numeric array.


## Installation

``` bash
$ npm install compute-csum
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var csum = require( 'compute-csum' );
```

#### csum( arr )

Computes the cumulative sum of a numeric `array`.

``` javascript
var data = [ 1, 2, 3, 4 ];

csum( data );
// returns [ 1, 3, 6, 10 ]
```


## Examples

``` javascript
var csum = require( 'compute-csum' );

var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

data.sort( function sort( a, b ) {
	return a - b;
});

console.log( csum( data ) );
// returns [...]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The function returns an `array` with a length equal to the original input `array`.


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-csum.svg
[npm-url]: https://npmjs.org/package/compute-csum

[travis-image]: http://img.shields.io/travis/compute-io/csum/master.svg
[travis-url]: https://travis-ci.org/compute-io/csum

[coveralls-image]: https://img.shields.io/coveralls/compute-io/csum/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/csum?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/csum.svg
[dependencies-url]: https://david-dm.org/compute-io/csum

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/csum.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/csum

[github-issues-image]: http://img.shields.io/github/issues/compute-io/csum.svg
[github-issues-url]: https://github.com/compute-io/csum/issues
