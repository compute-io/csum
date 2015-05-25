/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

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

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
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


	it( 'should throw an error if provided an accessor argument which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				csum( [1,2,3], value );
			};
		}
	});

	it( 'should compute the cumulative sum', function test() {
		var data, expected, results;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = [ 2, 6, 11, 14, 22, 24 ];

		results = csum( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should compute the cumulative sum using an accessor', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		actual = csum( data, getValue );
		expected = [ 2, 6, 11, 14, 22, 24 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( csum( [] ) );
	});

});
