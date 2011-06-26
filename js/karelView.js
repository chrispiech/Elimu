KarelView = {};

//---------------------------------- HELPER METHODS -------------------------//
KarelView.getCornerX = function(canvasModel, col) {
   return canvasModel.getWorldLeft() + col * canvasModel.getCornerSize();
}

KarelView.getCornerY = function(canvasModel, row) {
   return canvasModel.getWorldTop() + row * canvasModel.getCornerSize();
}

//---------------------------------- DRAW KAREL -----------------------------//
KarelView.getImage = function(karelModel) {
	switch(karelModel.getDirection()){
		case KarelConstants.KAREL_NORTH: return karelImages.karelNorth; 	
		case KarelConstants.KAREL_SOUTH: return karelImages.karelSouth;
		case KarelConstants.KAREL_EAST: return karelImages.karelEast;
		case KarelConstants.KAREL_WEST: return karelImages.karelWest;	
	}
	return null;
}

KarelView.getTinyImage = function(karelModel) {
	switch(karelModel.getDirection()){
		case KarelConstants.KAREL_NORTH: return karelImages.karelNorthTiny; 	
		case KarelConstants.KAREL_SOUTH: return karelImages.karelSouthTiny;
		case KarelConstants.KAREL_EAST: return karelImages.karelEastTiny;
		case KarelConstants.KAREL_WEST: return karelImages.karelWestTiny;	
	}
	return null;
}

KarelView.getSmallImage = function(karelModel) {
	switch(karelModel.getDirection()){
		case KarelConstants.KAREL_NORTH: return karelImages.karelNorthSmall; 	
		case KarelConstants.KAREL_SOUTH: return karelImages.karelSouthSmall;
		case KarelConstants.KAREL_EAST: return karelImages.karelEastSmall;
		case KarelConstants.KAREL_WEST: return karelImages.karelWestSmall;	
	}
	return null;
}

KarelView.getKarelImage = function(cornerSize, karelModel) {
	if (cornerSize <= KarelConstants.KAREL_TINY_SIZE) {
		return KarelView.getTinyImage(karelModel);
	} else if (cornerSize <= KarelConstants.KAREL_SMALL_SIZE) {
		return KarelView.getSmallImage(karelModel);
	} else {
		return KarelView.getImage(karelModel);
	}
	return null;
}

KarelView.drawKarel = function(canvasModel, karelModel, c) {
   var cornerSize = canvasModel.getCornerSize();

   var image = KarelView.getKarelImage(cornerSize, karelModel);
   if (typeof image == "undefined" || image == null) {
		alert('karel image loading fail!');
	}
	
	var karelX = KarelView.getCornerX(canvasModel, karelModel.getKarelCol());
	var karelY = KarelView.getCornerY(canvasModel, karelModel.getKarelRow());
	
	//draw karel one pixel smaller on all sides
	c.drawImage(image,karelX+1, karelY+1, cornerSize-2, cornerSize-2);
}

//---------------------------------- DRAW WORLD -----------------------------//


KarelView.drawBorder = function(canvasModel, c) {

   var borderLeft = canvasModel.getWorldLeft() - KarelConstants.BORDER_SIZE;
   var borderTop = canvasModel.getWorldTop() - KarelConstants.BORDER_SIZE;
   var borderWidth = canvasModel.getWorldWidth() + KarelConstants.BORDER_SIZE*2;
   var borderHeight = canvasModel.getWorldHeight() + KarelConstants.BORDER_SIZE*2;
   c.fillStyle = "#000";
	c.fillRect(borderLeft, borderTop, borderWidth, borderHeight);

	c.fillStyle = "#fff";
	c.fillRect(canvasModel.getWorldLeft(), canvasModel.getWorldTop(), 
	   canvasModel.getWorldWidth(), canvasModel.getWorldHeight());
}

KarelView.drawCorners = function(canvasModel, karelModel, c) {
   var crossSize = canvasModel.getCornerSize() * KarelConstants.CROSS_FRACTION;
   var cornerSize = canvasModel.getCornerSize();

	for (var rIndex = 0; rIndex < karelModel.getNumRows(); rIndex++) {
		for (var cIndex = 0; cIndex < karelModel.getNumCols(); cIndex++) {
			

			var squareLeft = KarelView.getCornerX(canvasModel, cIndex);
			var squareTop = KarelView.getCornerY(canvasModel, rIndex);
			var squareColor = karelModel.getSquareColor(rIndex, cIndex);

			if (squareColor != null) {
				c.fillStyle = squareColor;
				c.fillRect(squareLeft, squareTop, cornerSize, cornerSize);
			} else {				
				
				if (crossSize > KarelConstants.MIN_CROSS_SIZE) {
					var x = squareLeft + (cornerSize - crossSize)/2;
					var y = squareTop + (cornerSize - crossSize)/2;
					c.drawImage(karelImages.cross, x, y, crossSize, crossSize);
				} else {
					var x = squareLeft + (cornerSize)/2;
					var y = squareTop + (cornerSize)/2;
					var size = Math.max(1, crossSize/2);
					c.beginPath();
					c.arc(x, y, size, 0, Math.PI*2, true); 
					c.closePath();
					c.fillStyle = 'blue';
					c.fill();
				}
			}
			// Draw Beepers
		}
	}
}

KarelView.drawBackground = function(canvasModel, karelModel, c) {
   if (typeof karelImages.cross == "undefined" || karelImages.cross == null) {
		alert('image loading fail!');
	}
	KarelView.drawBorder(canvasModel, c);
   KarelView.drawCorners(canvasModel, karelModel, c);

}

KarelView.draw = function(canvasModel, karelModel, c) {
   KarelView.drawBackground(canvasModel, karelModel, c);
   KarelView.drawKarel(canvasModel, karelModel, c);
   //KarelView.drawWalls(canvasModel, karelModel, c);
}
