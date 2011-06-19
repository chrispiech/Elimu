

function KarelImages() {
	images = new Array();
	imageNames = new Array();
	imageNames[0] = "karelNorth.png";
	imageNames[1] = "karelSouth.png";
	imageNames[2] = "karelEast.png";
	imageNames[3] = "karelWest.png";
	imageNames[4] = "cross.png";
	imageNames[5] = "beeper.jpg";
	imageNames[6] = "karelNorthSmall.png";
	imageNames[7] = "karelSouthSmall.png";
	imageNames[8] = "karelEastSmall.png";
	imageNames[9] = "karelWestSmall.png";
	imageNames[10] = "karelNorthTiny.png";
	imageNames[11] = "karelSouthTiny.png";
	imageNames[12] = "karelEastTiny.png";
	imageNames[13] = "karelWestTiny.png";
	imageNames[14] = "tiny.gif";

	var callback = null;
	var imagesLoaded = 0;
	var calledLoadImages = false;

	this.checkLoaded = function() {
		for ( var i = 0; i < images.length; i++ ) {
			if (!images[i].complete) {
				return;
			}
		}
		interval=self.clearInterval(interval);
		karelImages.createVariables();
		callback();
	}

	this.loadImages = function(func) {
		if (calledLoadImages) alert("called loadImages twice");
		callback = func;
		calledLoadImages = true;
		imagesLoaded = 0;
	

		for (var i = 0; i < imageNames.length; i++) {
			var imageName = imageNames[i];
			images[i] = new Image();
			images[i].src = "images/" + imageName;
		}
		interval = setInterval("karelImages.checkLoaded()",500);
	}

	

	this.imageProcessed = function() {
		imagesLoaded += 1;
 
		if (imagesLoaded == imageNames.length) {
			karelImages.createVariables();
			callback();
		}
	}

	this.createVariables = function() {
		this.karelNorth = images[0];
		this.karelSouth = images[1];
		this.karelEast = images[2];
		this.karelWest = images[3];
		this.cross = images[4];
		this.beeper = images[5];
		this.karelNorthSmall = images[6];
		this.karelSouthSmall = images[7];
		this.karelEastSmall = images[8];
		this.karelWestSmall = images[9];
		this.karelNorthTiny = images[10];
		this.karelSouthTiny = images[11];
		this.karelEastTiny = images[12];
		this.karelWestTiny = images[13];
	}
}
