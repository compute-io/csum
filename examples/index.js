'use strict';

var matrix = require( 'dstructs-matrix' ),
	csum = require( './../lib' ),
	cast = require( 'compute-cast-arrays' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

data.sort( function sort( a, b ) {
	return a - b;
});

out = csum( data );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = csum( data, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );

// ----
// Typed arrays...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
data.sort( function sort( a, b ) {
	return a - b;
});
var data = cast( data, 'int32' );
tmp = csum( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [100, 10], 'int32' );
out = csum( mat );
console.log( 'Matrix (along columns): %s\n', out.toString() );

out = csum( mat, {
	'dim': 1
});
console.log( 'Matrix (along rows): %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = csum( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (along columns, %s): %s\n', out.dtype, out.toString() );
