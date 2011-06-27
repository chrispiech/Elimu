

// Beepers class	
function Beepers(rows, cols, left, top) {

	var BEEPER_SIZE_FRACTION = 0.75;
	var MIN_BEEPER_LABEL_SIZE = 20;
	
	var beepers = new Array();
	for (var i = 0; i < rows; i++) {
		beepers[i] = new Array();
		for (var j = 0; j < cols; j++) {
			beepers[i][j] = 0;	
		}
	}

	function getBeeperSize(cornerSize) {
		return cornerSize * BEEPER_SIZE_FRACTION;
	}

	this.draw = function(c, cornerSize) {

		var beeperSize = getBeeperSize(cornerSize);
	
		c.fillStyle = "#000";
		c.font = "bold 14px courier";
		c.textAlign = "center";
		c.textBaseline = "middle";


		for (var rIndex = 0; rIndex < rows; rIndex++) {
			for (var cIndex = 0; cIndex < cols; cIndex++) {

				var numBeepers = beepers[rIndex][cIndex];

				if (numBeepers > 0) {
					var x = left + cIndex * cornerSize + (cornerSize - beeperSize)/2;
					var y = top + rIndex * cornerSize + (cornerSize - beeperSize)/2;
					c.drawImage(karelImages.beeper, x, y, beeperSize, beeperSize);
				} 

				if (numBeepers > 1 && beeperSize > MIN_BEEPER_LABEL_SIZE) {
					var strWidth = c.measureText(""+numBeepers);
					var strHeight = 12;
					var x = left + cIndex * cornerSize + (cornerSize)/2;
					var y = top + rIndex * cornerSize + (cornerSize)/2;
					c.fillText(""+numBeepers, x, y);
				}
			}
		}
	}

	this.beeperPresent = function(r, c) {
		return beepers[r][c] > 0;
	}

	this.putBeeper = function(r, c) {
		beepers[r][c] = beepers[r][c] + 1;
	}

	this.pickBeeper = function(r, c) {
		beepers[r][c] = beepers[r][c] - 1;
	}
}


