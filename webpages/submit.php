<html> 
<head>
	<title>Deploy</title>
				<!-- Standard includes -->
                <link rel="stylesheet" href="css/style.css" type="text/css" />
				<link rel="stylesheet" href="css/ide.css" type="text/css" />
				<link rel="stylesheet" type="text/css" href="css/tabs.css" />

				<script type="text/javascript"
					src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js">
				</script> 
				
                <script type="text/javascript" src="lib/util.js"></script>
                <script type="text/javascript" src="lib/point.js"></script>
                <script type="text/javascript" src="lib/circle.js"></script>
				<script type="text/javascript" src="lib/cookie.js"></script>
				<script type="text/javascript" src="lib/tabs.js"></script>
                <script type="text/javascript" src="codeMirror/js/codemirror.js"></script>
				<script type="text/javascript" src="js/karelImages.js"></script>
				<script type="text/javascript" src="js/action.js"></script>
                <script type="text/javascript" src="js/karel.js"></script>
                <script type="text/javascript" src="js/beepers.js"></script>
                <script type="text/javascript" src="js/walls.js"></script>
                <script type="text/javascript" src="js/karelWorld.js"></script>
                <script type="text/javascript" src="js/karelApplication.js"></script>
                <script type="text/javascript" src="js/application.js"></script>
				<script type="text/javascript" src="js/submitContest.js"></script>
</head>
<body>
	<script type="text/javascript">
			function sendButton() {
				var title = document.getElementById("programTitle").value;
				var author = document.getElementById("author").value;
				var comments = encodeURIComponent(document.getElementById("comments").value);
				var email = encodeURIComponent(document.getElementById("email").value);
				location.href = "submitResult?title="+title+"&author="+author+"&comments="+comments+"&email="+email+"&code=%s"; 
			}
	</script>

	 <div id="inner">
     	<div id="header">        
        		<a id="logo" href="/" rel="nofollow"></a>  
                <div id = "smallLinks">

						<span id = "social"></span>
                        
                        <a class="smallLink" href="about.html" rel="nofollow">About</a>
                </div>
            </div> 
			<hr size="2" noshade color="#000"/>
            <br/>
			<div id="deploy">
				Would you like to deploy your program?

				<p><b>Program Name</b><br>
				<input type="text" name="programTitle" id = "programTitle" size=30></p>
				<p><b>Your Name</b><br>
				<input type="text" name="author" id = "author" size=30></p>
				<p><b>Your Email</b><br>
				<input type="text" name="email" id = "email" size=30></p>
				<p><b>Comments</b><br>
				<TEXTAREA NAME="comments" id = "comments" COLS=40 ROWS=6></TEXTAREA></p>
				<p><button type="button" id="interactor" onClick="sendButton()"><IMG SRC="./images/uploadButton.png" HEIGHT=30 WIDTH=30 ALT="run" ALIGN="ABSMIDDLE"></button></form></p>
			</div>
		</div>
	</div>
</body>
</html>
