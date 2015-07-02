/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	csum = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-csum', function tests() {

	it( 'should export a function', function test() {
		expect( csum ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				csum( value );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				csum( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				csum( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				csum( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the cumulative sum', function test() {
		var data, actual, expected;

		data = [ 4, 2, 3, 5, 1, 2, 2 ];
		actual = csum( data );
		expected = [ 4, 6, 9, 14, 15, 17, 19 ];

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = csum( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute the cumulative sum and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 1, 4, 9, 1, 2 ];
		expected = new Int8Array( [ 1, 5, 14, 15, 17 ] );

		actual = csum( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute the cumulative sum using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = [ 2, 6, 11, 14, 22, 24 ];

		actual = csum( data, {
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the cumulative sum along matrix columns', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 1, 3, 3, 7, 12, 6, 13, 21 ] );
		expected = matrix( d2, [3,3], 'float64' );
		data = matrix( d1, [3,3], 'int16' );

		actual = csum( data, {
			'dim': 2
		});

		assert.deepEqual( actual.data, expected.data );

		// Mutate...
		actual = csum( data, {
			'copy': false,
			'dim': 2
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual.data, d2 );
	});

	it( 'should compute the cumulative sum along matrix rows', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 1, 2, 3, 5, 7, 9, 12, 15 ] );
		expected = matrix( d2, [3,3], 'float64' );
		data = matrix( d1, [3,3], 'int16' );

		actual = csum( data, {
			'dim': 1
		});

		assert.deepEqual( actual.data, expected.data );

		// Mutate...
		actual = csum( data, {
			'copy': false,
			'dim': 1
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual.data, d2 );
	});

	it( 'should compute the cumulative sum along matrix columns and cast to a specific data type', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 1, 3, 3, 7, 12, 6, 13, 21 ] );
		expected = matrix( d2, [3,3], 'int16' );
		data = matrix( d1, [3,3], 'int16' );

		actual = csum( data, {
			'dim': 2,
			'dtype': 'int16'
		});

		assert.deepEqual( actual.data, expected.data );
	});

});
