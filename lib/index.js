'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' );

// CSUM //

/**
* FUNCTION: csum( arr[, accessor] )
*	Computes the cumulative sum of a numeric array.
*
* @param {Number[]|Array} arr - numeric array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number[]|Null} cumulative sum or null
*/
function csum( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'csum()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 && !isFunction( clbk ) ) {
		throw new TypeError( 'csum()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
	}
	var len = arr.length,
		v = new Array( len ),
		val,
		i;

	if ( !len ) {
		return null;
	}

	if ( clbk ) {
		v[ 0 ] = clbk( arr[ 0 ], 0 );
		for ( i = 1; i < len; i++ ) {
			val = clbk( arr[i], i );
			v[ i ] = v[ i-1 ] + val;
		}
	} else {
		v[ 0 ] = arr[ 0 ];
		for ( i = 1; i < len; i++ ) {
			v[ i ] = v[ i-1 ] + arr[ i ];
		}
	}

	return v;
} // end FUNCTION csum()


// EXPORTS //

module.exports = csum;
