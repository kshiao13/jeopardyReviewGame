<!DOCTYPE html>
<html lang="en-CA">
<head>
	<meta charset="UTF-8">
<?php
print <<<HERE
<link rel="icon" type="image/x-icon" href="multimedia/AmericanFlag.ico"/>
<link rel="shortcut icon" type="image/x-icon" href="multimedia/AmericanFlag.ico"/>
<link href="css/reset.css" rel="stylesheet">
<link href="css/header-and-footer.css" rel="stylesheet">
<link href="css/confirmation/main.css" rel="stylesheet">
<link href="css/animations.css" rel="stylesheet">
HERE;
?>
	<title>CONFIRMATION OF SCORE ENTRY INTO DATABASE</title>
</head>
<body>
	<div id="wrapper">
		<header>
			<h1>AP US HISTORY JEOPARDY REVIEW GAME!</h1>
			<h2>CONFIRMATION OF SCORE ENTRY INTO DATABASE</h2>
		</header>
<?php
#Save the newly received statistics sent to PHP from "finaljeopardy.html" via the POST method into the corresponding PHP variables. 
$contestantName=filter_input(INPUT_POST,"contestantName");
$jeopardyTotalPrize=filter_input(INPUT_POST,"jeopardyTotalPrize");
$doubleJeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$totalPrize=filter_input(INPUT_POST,"totalPrize");
$jeopardyCorrect=filter_input(INPUT_POST,"jeopardyCorrect");
$doubleJeopardyCorrect=filter_input(INPUT_POST,"doubleJeopardyCorrect");
$totalCorrect=$jeopardyCorrect+$doubleJeopardyCorrect;
	
if (isset($contestantName) && isset($jeopardyTotalPrize) && isset($doubleJeopardyTotalPrize) && 
	isset($totalPrize) && isset($jeopardyCorrect) && isset($doubleJeopardyCorrect)){

#Create a new DOMDocument object to be able to work with a XML document & use the XML DOM methods in PHP.
$statSheet=new DOMDocument();

#Important! These 2 following lines of code must be before the file is loaded so PHP knows that the XML file should be formatted.
$statSheet->preserveWhiteSpace=false; 
$statSheet->formatOutput=true;
$statSheet->load("data/playerstats.xml");

/*
Set up a XML node with 5 child nodes inside to store player stats.

Example:
<playerSummary>
	<player name="NICOLE">
		<jeopardyTotalPrize>15000</jeopardyTotalPrize>
		<doubleJeopardyTotalPrize>15000</doubleJeopardyTotalPrize>
		<totalPrize>30000</totalPrize>
		<jeopardyCorrect>25</doubleJeopardyCorrect>
		<doubleJeopardyCorrect>25</doubleJeopardyCorrect>
		<totalCorrect>51</totalCorrect>
	</player>
</playerSummary>
*/

#Obtain the XML file's root element.
$rootElement=$statSheet->getElementsByTagName("playerSummary")->item(0);
$playerElement=$statSheet->createElement("player");
$rootElement->appendChild($playerElement); #Append the XML node for contestant name as a direct descendant of the root element.
$playerElement->setAttribute("name","$contestantName");

#The contestant name node will have 5 children nodes: jeopardyTotalPrize, doubleJeopardyTotalPrize, finalPrize, jeopardyCorrect, doubleJeopardyCorrect.

$jeopardyTotalPrizeElement=$statSheet->createElement("jeopardyTotalPrize");
$jeopardyTotalPrizeNodeValue=$statSheet->createTextNode($jeopardyTotalPrize);
$jeopardyTotalPrizeElement->appendChild($jeopardyTotalPrizeNodeValue);

$doubleJeopardyTotalPrizeElement=$statSheet->createElement("doubleJeopardyTotalPrize");
$doubleJeopardyTotalPrizeNodeValue=$statSheet->createTextNode($doubleJeopardyTotalPrize);
$doubleJeopardyTotalPrizeElement->appendChild($doubleJeopardyTotalPrizeNodeValue);

$totalPrizeElement=$statSheet->createElement("totalPrize");
$totalPrizeNodeValue=$statSheet->createTextNode($totalPrize);
$totalPrizeElement->appendChild($totalPrizeNodeValue);

$jeopardyCorrectElement=$statSheet->createElement("jeopardyCorrect");
$jeopardyCorrectNodeValue=$statSheet->createTextNode($jeopardyCorrect);
$jeopardyCorrectElement->appendChild($jeopardyCorrectNodeValue);

$doubleJeopardyCorrectElement=$statSheet->createElement("doubleJeopardyCorrect");
$doubleJeopardyCorrectNodeValue=$statSheet->createTextNode($doubleJeopardyCorrect);
$doubleJeopardyCorrectElement->appendChild($doubleJeopardyCorrectNodeValue);

$totalCorrectElement=$statSheet->createElement("totalCorrect");
$totalCorrectNodeValue=$statSheet->createTextNode($totalCorrect);
$totalCorrectElement->appendChild($totalCorrectNodeValue);

$childNodes=array($jeopardyTotalPrizeElement,$doubleJeopardyTotalPrizeElement,$totalPrizeElement,
                  $jeopardyCorrectElement,$doubleJeopardyCorrectElement,$totalCorrectElement
			);

#Run a for-loop to assign the 6 newly created nodes as children of the contestantName node.
for ($i=0;$i<count($childNodes);$i++){
	$playerElement->appendChild($childNodes[$i]);
}
$statSheet->save("data/playerstats.xml");
	
print <<<HERE
<p>YOUR SCORES HAVE BEEN SUCCESSFULLY SAVED AND WILL BE CONSIDERED FOR POSSIBLE RANKING IN THE ALL-TIME LIST.</p>
HERE;
} else {
	print <<<HERE
	<p>THE PAGE DID NOT RECEIVE ANY PLAYER STATS FROM finaljeopardy.html AND THUS NO NEW DATA WAS ENTERED INTO THE SERVER DATA FILE.</p>	
HERE;
}

$date=new DateTime();
$currentYear=$date->format("Y"); 

print <<<HERE
<p>WHAT WOULD YOU LIKE TO DO NOW?</p>
<button>REVIEW THE CURRICULUM COVERED IN THIS GAME.</button>
<button>PLAY AGAIN!</button>
<button>VIEW ALL-TIME LIST</button>
<footer>&copy;$currentYear. KAI SHIAO. ALL RIGHTS RESERVED.</footer>
HERE;
?>
	</div>
<?php
print <<<HERE
<script src="jquery/jquery-2.2.2.min.js"></script>
<script src="jquery/confirmation.js"></script>
HERE;
?>
</body>
</html>