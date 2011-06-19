<?php
// Report all PHP errors (see changelog)
error_reporting(E_ALL);
?>

<html>
<body>
<?php
$title = $_GET['title'];
$code = $_GET['code'];

$to = "javascriptkarel@gmail.com";
$subject = "Hi!";
$body = "Hi,\n\nHow are you?";
$headers = "From: piech@cs.stanford.edu\r\n" .
    "X-Mailer: php";
    
if (mail($to, $subject, $body, $headers)) {
	echo("<h1>Contest entry submitted!</h1>");
} else {
	echo("<h1>Contest entry submission comming soon!</h1>");
}

?>
</body>

</html>
