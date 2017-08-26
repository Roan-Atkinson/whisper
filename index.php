<html>
	<head>
		<title>whisper</title>
		<link rel="shortcut icon" type="image/png" href="lock.png">
		<style type="text/css">
		  body {background-color: #000000; text-align: center; color: white; font-family: Courier New;}
		  h1 {color: #ffffff;}
		  input {color: black;}
		  .button {font-size: 20px;}
		  #messageInput{width: 500px; padding: 3px; font-size: 12px;}
		  #chat{height: 500px; width: 550px; background-color: #1a1a1a; margin: 0 auto; border-radius: 10px; padding: 20px; text-align: left; overflow: scroll;}
		</style>
	</head>
	<body>
	  <h1>whisper</h1>
	  <div id="chat"></div>
	  <br>
	  <form method="post">
		  message:	<input type="text" name="message" id="messageInput" onblur="this.focus()" autofocus>
	     <input type="submit" name="send" value="send"><br><br>
	  </form>

	  <script src="main.js"></script>

	</body>
</html>






<?php

function sendMessage() {

	$username = $_GET['user'];

   $message = $_POST["message"];
	if ($message == "\$clear") {
		exec("echo \">chat log cleared\" > chat.data");
		return;
	} elseif ($message == "\$help") {
		$command = substr($message, 1);
		exec("echo \"<br>$username: \\$$command\" >> chat.data");
		exec("echo $(cat help.menu) >> chat.data");
		return;
	} elseif ($message[0] == "$") {
		$command = substr($message, 1);
		exec("echo \"<br>$username: \\$$command\" >> chat.data");
		exec("echo \"<br>\\$$command: command not found\" >> chat.data");
		return;
	}

	exec("echo \"<br>$username: $message\" >> chat.data");

}

if (array_key_exists('send',$_POST)) {
   sendMessage();
}

?>
