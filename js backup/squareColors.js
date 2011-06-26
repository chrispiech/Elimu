
// Walls class	
function SquareColors(rows, cols) {

   var that = {};

	var colors = new Array();
	for (var i = 0; i < rows; i++) {
		colors[i] = new Array();
		for (var j = 0; j < cols; j++) {
			colors[i][j] = null;
		}
	}

	return that;

}
