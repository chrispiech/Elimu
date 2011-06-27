
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

	that.getColor = function(r, c) {
	   return colors[r][c];
   }

   that.deepCopy = function() {
      var newModel = SquareColors(rows, cols);
      newModel.colors = deepCopyUtil(that.colors);
      return newModel;
   }

	return that;

}
