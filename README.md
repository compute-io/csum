csum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative sum.


## Installation

``` bash
$ npm install compute-csum
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var csum = require( 'compute-csum' );
```

#### csum( x[, options] )

Computes the cumulative sum. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, arr;

data = [ 1, 2, 3, 4 ];
arr = csum( data );
// returns [ 1, 3, 6, 10 ]
```

The function accepts the following `options`:

*  __copy__: `boolean` indicating whether to return a new data structure containing the cumulative sums. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.
*  __dim__: dimension along which to compute the cumulative sum when provided a matrix. Default: `2` (along the columns).
*  __dtype__: output data type. Default: `float64`.

For non-numeric `arrays`, provide an accessor `function` for accessing `numeric` values.

``` javascript
var arr = [
	{'x':1},
	{'x':2},
	{'x':3},
	{'x':4},
];

function getValue( d ) {
	return d.x;
}

var sum = csum( arr, {
	'accessor': getValue
});
// returns [ 1, 3, 6, 10 ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.

By default, the function computes the cumulative sum for a [`matrix`](https://github.com/dstructs/matrix) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

data = new Int8Array( 9 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int8' );
/*
	[  0  1  2  
	   3  4  5
	   6  7  8 ]
*/

out = csum( mat );
/*
	[  0   1   3  
	   3   7  12
	   6  13  21 ]
*/
```

To compute the cumulative sum along the rows, set the `dim` option to `1`.

``` javascript
out = csum( mat, {
	'dim': 1
});
/*
	[  0   1   2
	   3   5   7
	   9  12  15 ]
*/
```

By default, the output data type is `float64`. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
out = csum( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[  0   1   2
	   3   5   7
	   9  12  15 ]
*/

var dtype = mu.dtype;
// returns 'uint8'

out = csum( [ 1, 2, 3, 4 ], {
	'dtype': 'uint8'
})
// returns Uint8Array( [ 1,3,6,10] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 1, 2, 3, 4 ];

out = csum( data, {
	'copy': false
});
// returns [ 1, 3, 6, 10 ]

bool = ( data === out );
// returns true

data = new Int16Array( 9 );
for ( i = 0; i < 9; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int16' );
/*
	[  0  1  2  
	   3  4  5
	   6  7  8 ]
*/

out = csum( mat, {
	'copy': false
});
/*
	[  0   1   3  
	   3   7  12
	   6  13  21 ]
*/

bool = ( mat === out );
// returns true
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	csum = require( 'compute-csum' ),
	cast = require( 'compute-cast-arrays' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

data.sort( function sort( a, b ) {
	return a - b;
});

out = csum( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = csum( data, {
	'accessor': getValue
});

// Typed arrays...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
data.sort( function sort( a, b ) {
	return a - b;
});
var data = cast( data, 'int32' );
tmp = csum( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [100, 10], 'int32' );
out = csum( mat );
console.log( 'Matrix (along columns): %s\n', out.toString() );

out = csum( mat, {
	'dim': 1
});

// Matrices (custom output data type)...
out = csum( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The function returns an `array` with a length equal to the original input `array`.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.

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
