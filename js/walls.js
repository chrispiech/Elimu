
// Walls class	
function Walls(rows, cols, left, top) {

	var WALL_THICKNESS_FRACTION = 0.1;

	var topWalls = new Array();
	for (var i = 0; i < rows; i++) {
		topWalls[i] = new Array();
		for (var j = 0; j < cols; j++) {
			topWalls[i][j] = 0;
		}
	}

	var rightWalls = new Array();
	for (var i = 0; i < rows; i++) {
		rightWalls[i] = new Array();
		for (var j = 0; j < cols; j++) {
			rightWalls[i][j] = 0;
		}
	}

	function getWallThickness(cornerSize) {
		var thickness = cornerSize * WALL_THICKNESS_FRACTION;
		if (thickness < 2) return 2;
		return thickness;
	}

	this.draw = function(c, cornerSize) {
		var wallThickness = getWallThickness(cornerSize);

		for (var rIndex = 0; rIndex < rows; rIndex++) {
			for (var cIndex = 0; cIndex < cols; cIndex++) {

				if (topWalls[rIndex][cIndex] != 0) {
					var x = left + cIndex * cornerSize - wallThickness/2;
					var y = top + rIndex * cornerSize - wallThickness/2;

					c.fillStyle = "#000";
					c.fillRect(x, y, cornerSize + wallThickness, wallThickness);
				} 

				if (rightWalls[rIndex][cIndex] != 0) {
					var x = left + (cIndex + 1) * cornerSize - wallThickness/2;
					var y = top + rIndex * cornerSize - wallThickness/2;

					c.fillStyle = "#000";
					c.fillRect(x, y, wallThickness, cornerSize + wallThickness);
				} 
			}
		}
	}

	this.addTopWall = function(r, c) {
		topWalls[r][c] = 1;
	}

	this.addRightWall = function(r, c) {
		rightWalls[r][c] = 1;
	}

	this.rightWall = function(r, c) {
		return rightWalls[r][c] != 0;
	}

	this.topWall = function(r, c) {
		return topWalls[r][c] != 0;
	}

}
