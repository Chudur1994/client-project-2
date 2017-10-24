<?php
//supress warnings & errors
error_reporting(0);

//sets the base of the url we want to hit
define ('HOSTNAME', 'http://www.ist.rit.edu/api');

//access the api - remember we have to send in a leading '/'
//so the path variable could be '/about/'
$url=HOSTNAME.$_GET['path'];

//set up curl (Client Uniform Resource Locator)
	//  Initiate curl and set url
	$ch = curl_init($url);
	// allow us to include a header in the return (we are setting to false as we don't need to)
	curl_setopt($session, CURLOPT_HEADER, true);
	// Will return the response, if false it print the response (we want to capture it in a variable $result)
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// Execute
	$result=curl_exec($ch);
	// Closing
	curl_close($ch);

//we want json back so set the correct mimetype
header("Content-Type: text/plain");

//give it to me!
echo $result;
?>
