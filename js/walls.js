
// Walls class	
function Walls(rows, cols) {

   var that = {};

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

	that.addTopWall = function(r, c) {
		topWalls[r][c] = 1;
	}

	that.addRightWall = function(r, c) {
		rightWalls[r][c] = 1;
	}

	that.rightWall = function(r, c) {
		return rightWalls[r][c] != 0;
	}

	that.topWall = function(r, c) {
		return topWalls[r][c] != 0;
	}

	that.isMoveValid = function(startR, startC, endR, endC) {
	   if(endC < 0 || endC >= cols) return false;
		if(endR < 0 || endR >= rows) return false;
		
		if(startC + 1 == endC && rightWalls[startR][startC]) return false;
		if(startC - 1 == endC && rightWalls[endR][endC]) return false;

		if(startR + 1 == endR && topWalls[endR][endC]) return false;
		if(startR - 1 == endR && topWalls[startR][endC]) return false;

		return true;
	}

	return that;

}
