'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );



// FUNCTIONS //

var csum1 = require( './array.js' ),
	csum2 = require( './accessor.js' ),
	csum3 = require( './matrix.js' );

// CUMULATIVE SUM //

/**
* FUNCTION: csum( x[, options] )
*	Computes the cumulative sum.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [options.copy=true] - boolean indicating if the function should return a new data structure
* @param {Number} [opts.dim=2] - dimension along which to compute the cumulative sum.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} cumulative sums
*/

function csum( x, options ) {

	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		dim,
		dt,
		d,
		out;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( isMatrixLike( x ) ) {
		dim = opts.dim;
		if ( dim === undefined ) {
			dim = 2;
		} else if ( dim > 2 ) {
			throw new RangeError( 'csum()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'csum()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return csum3( out, x, dim );
	}

	if ( isArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'csum()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return csum2( out, x, opts.accessor );
		}
		return csum1( out, x );
	}

	throw new TypeError( 'csum()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION csum()


// EXPORTS //

module.exports = csum;
