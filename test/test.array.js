/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	csum = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array csum', function tests() {

	it( 'should export a function', function test() {
		expect( csum ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative sum', function test() {
		var data, actual, expected;

		data = [ 4, 2, 3, 5, 1, 2, 2 ];
		actual = new Array( data.length );
		actual = csum( actual, data );
		expected = [4, 6, 9, 14, 15, 17, 19 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( csum( [], [] ), [] );
	});

});
