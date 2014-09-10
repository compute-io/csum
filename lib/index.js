/**
*
*	COMPUTE: csum
*
*
*	DESCRIPTION:
*		- Computes the cumulative sum over an array of values.
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

(function() {
	'use strict';

	/**
	* FUNCTION: csum( arr )
	*	Computes the cumulative sum over an array of values.
	*
	* @param {Array} arr - array of values
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

})();