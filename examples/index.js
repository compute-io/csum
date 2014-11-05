'use strict';

var csum = require( './../lib' );

var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

data.sort( function sort( a, b ) {
	return a - b;
});

console.log( csum( data ) );
// returns [...]