'use strict';

// CUMULATIVE SUM //

/**
* FUNCTION: csum( out, arr )
*	Computes the cumulative sum of an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function csum( v, arr ) {
	var len = arr.length,
		i;

	if ( len ) {
		v[ 0 ] = arr[ 0 ];
		for ( i = 1; i < len; i++ ) {
			v[ i ] = v[ i-1 ] + arr[ i ];
		}
	}

	return v;
} // end FUNCTION csum()


// EXPORTS //

module.exports = csum;
