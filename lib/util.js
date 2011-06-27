

function getWidth() {
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
    		myWidth = window.innerWidth;
    		myHeight = window.innerHeight;
  	} else if( document.documentElement && ( document.documentElement.clientWidth || 
			document.documentElement.clientHeight ) ) {
    		//IE 6+ in 'standards compliant mode'
    		myWidth = document.documentElement.clientWidth;
    		myHeight = document.documentElement.clientHeight;
  	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    		//IE 4 compatible
    		myWidth = document.body.clientWidth;
    		myHeight = document.body.clientHeight;
  	}
  	return myWidth;
}

function getHeight() {
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
    		myWidth = window.innerWidth;
    		myHeight = window.innerHeight;
  	} else if( document.documentElement && ( document.documentElement.clientWidth || 
			document.documentElement.clientHeight ) ) {
    		//IE 6+ in 'standards compliant mode'
    		myWidth = document.documentElement.clientWidth;
    		myHeight = document.documentElement.clientHeight;
  	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    		//IE 4 compatible
    		myWidth = document.body.clientWidth;
    		myHeight = document.body.clientHeight;
  	}
  	return myHeight;
}

function loadDoc(url, callback) {
	var request;

	if (window.XMLHttpRequest) { 
		request = new XMLHttpRequest();     // Firefox, Safari, ...
	} else if (window.ActiveXObject) {
    		request = new ActiveXObject("Microsoft.XMLHTTP");  // Internet Explorer 
 	} 

	request.open("GET", url, false);
	request.send(null);	

	if (request.status == 404) {
		alert("file not found");
	}
	callback(request.responseText);
}

function deepCopyUtil(p,c) {
   if(p == null) return p;
var c = c||{};
for (var i in p) {
  if (typeof p[i] === 'object' && p[i] != null) {
    c[i] = (p[i].constructor === Array)?[]:{};
    deepCopyUtil(p[i],c[i]);
  } else c[i] = p[i];}
return c;
}


