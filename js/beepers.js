

// Beepers class	
function Beepers(rows, cols) {

   var that = {};
	
	var beepers = new Array();
	for (var i = 0; i < rows; i++) {
		beepers[i] = new Array();
		for (var j = 0; j < cols; j++) {
			beepers[i][j] = 0;	
		}
	}	

	that.beeperPresent = function(r, c) {
		return beepers[r][c] > 0;
	}

	that.putBeeper = function(r, c) {
		beepers[r][c] = beepers[r][c] + 1;
	}

	that.pickBeeper = function(r, c) {
		beepers[r][c] = beepers[r][c] - 1;
	}

	return that;
}


