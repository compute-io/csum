/**
*
*	COMPUTE: csum
*
*
*	DESCRIPTION:
*		- Computes the cumulative sum of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: csum( arr )
*	Computes the cumulative sum of a numeric array.
*
* @param {Array} arr - numeric array
* @returns {Array} cumulative sum
*/
function csum( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'csum()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length,
		v = new Array( len );

	v[ 0 ] = arr[ 0 ];
	for ( var i = 1; i < len; i++ ) {
		v[ i ] = v[ i-1 ] + arr[ i ];
	}
	return v;
} // end FUNCTION csum()


// EXPORTS //

module.exports = csum;
