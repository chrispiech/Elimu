
// Walls class	
function SquareColors(rows, cols) {

   var that = {};

	that.colors = new Array();
	for (var i = 0; i < rows; i++) {
		that.colors[i] = new Array();
		for (var j = 0; j < cols; j++) {
			that.colors[i][j] = null;
		}
	}

	that.paintCorner = function(r, c, color) {
      that.colors[r][c] = color;
	}

	that.getColor = function(r, c) {
	   return that.colors[r][c];
   }

   that.deepCopy = function() {
      var newModel = SquareColors(rows, cols);
      newModel.colors = deepCopyUtil(that.colors);
      return newModel;
   }

	return that;

}
