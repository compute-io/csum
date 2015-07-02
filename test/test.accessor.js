/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	csum = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor csum', function tests() {

	it( 'should export a function', function test() {
		expect( csum ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative sum using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2},
			{'x':0},
			{'x':2}
		];
		expected = [ 2, 6, 11, 14, 22, 24, 24, 26 ];

		actual = new Array( data.length );
		actual = csum( actual, data, getValue );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( csum( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
