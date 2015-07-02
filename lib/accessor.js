'use strict';

// CUMULATIVE SUM //

/**
* FUNCTION: csum( out, arr, clbk )
*	Computes the cumulative sum of an array using an accessor.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function csum( v, arr, clbk ) {
	var len = arr.length,
		i,
		val;

	if ( len ) {
		v[ 0 ] = clbk( arr[ 0 ], 0 );
		for ( i = 1; i < len; i++ ) {
			val = clbk( arr[i], i );
			v[ i ] = v[ i-1 ] + val;
		}
	}
	return v;
} // end FUNCTION csum()


// EXPORTS //

module.exports = csum;
