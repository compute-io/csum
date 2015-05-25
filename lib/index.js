'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );

// CSUM //

/**
* FUNCTION: csum( arr[, options] )
*	Computes the cumulative sum of a numeric array.
*
* @param {Number[]|Array} arr - numeric array
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @returns {Number[]|Null} cumulative sum or null
*/
function csum( arr, opts ) {
	var copy = true,
		clbk;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'csum()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
				throw new TypeError( 'mmin()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
			}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'mmin()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'mmin()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}
	var len = arr.length,
		v,
		val,
		i;

	if ( !len ) {
		return null;
	}

	if ( copy ) {
		v = new Array( len );
	} else {
		v = arr;
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
