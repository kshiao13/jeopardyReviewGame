(function(){
	$('document').ready(function(){
		$.ajax({
			url: 'data/playerstats.xml',
			success: function(xml){ //'success' in a callback context is still valid and acceptable; .success() as a chained method following $.ajax() is deprecated.
						var $k=0;
						var $statsList=['jeopardyTotalPrize','doubleJeopardyTotalPrize','totalPrize',
										'jeopardyCorrect','doubleJeopardyCorrect','totalCorrect'
						];
						
						while ($k<$statsList.length){
							var $playerNames=[]; //Initialize an empty array to hold all the names of players.
							var $allObservations=[]; //Initialize an empty array to hold all the figures for a certain statistic sourced from the XML file.
							var $currentStat=$statsList[$k];
							var $totalCount=$(xml).find($statsList[$k]).length; //Obtain the current statistic by using the sentry variable's vlaue as the array index to select the element.
							//Find the total number of element nodes pertaining to that statistic; it will determine the number of times the for-loop will be run.
							console.log($totalCount);
							
							for (var $i=0;$i<$totalCount;$i++){
								var $name=$(xml).find($currentStat).eq($i).parent().attr('name');
								var $value=$(xml).find($currentStat).eq($i).text();
									
								//Populate array with all the names and values from "playerstats.xml".
								$playerNames.push($name); 
								$allObservations.push($value); 
							}
							
							$allObservations.sort(function(a,b){ 
									return b-a;
							}).splice(9,$allObservations.length-10);
							//Sort $allObservations in a descending fashion and select only the top 10 and remove all remaining elements.
							console.log($allObservations.length);
							//Only keep the top 10 values and delete the rest.
							//Start deleting from the element with an index number of 9 (but not including this element).
														
							var $dynamicallyGeneratedNameList=''; //Will be used to hold dynamically generated <li> elements containing top 10 players' names.
							var $dynamicallyGeneratedStatList='';//Will be used to hold dynamically generated <li> elements containing top 10 observations for that statistic.
							//Construct the list of the top 10 values using a for-loop.
														
							for (var $i=0;$i<$allObservations.length;$i++){
								var $originalIndexPosition=$allObservations.indexOf($allObservations[$i]);
								$dynamicallyGeneratedNameList+='<li>'+$playerNames[$originalIndexPosition]+'</li>';
								if ($allObservations[$i]<0){
									$allObservations[$i]=$allObservations[$i]*(-1);
									$dynamicallyGeneratedStatList+='<li class="shiftLeft">-$'+$allObservations[$i]+'</li>';
								} else {
									$dynamicallyGeneratedStatList+='<li>$'+$allObservations[$i]+'</li>';	
								}
							}
							
							var $htmlMarkupForNameList='<ol class="fadeIntoView">'+$dynamicallyGeneratedNameList+'</ol>';
							var $htmlMarkupForStatList='<ul class="fadeIntoView">'+$dynamicallyGeneratedStatList+'</ul>';
							$('body').find('section').eq($k).append($htmlMarkupForNameList).append($htmlMarkupForStatList);
							
							$k++;
						}
					 },
			fail: function(){
					$('body').append('<p>SORRY, THERE WAS AN AJAX ERROR.</p>');
				  }
		});
	});
	
	$('body').find('button').on('click',respondToClickEvent);
})();

function respondToClickEvent(e){
	var $eventTarget=$(e.target);
	var $eventTargetID=$(e.target).attr('id');
	
	function displayMessage(){
		var $cssTopValue=$eventTarget.offset().top-10; //Ensure that the loading message always appears in the window by finding the event target's top coordinate value.
		$('body').append('<p>DATA UPDATED!</p>');
		$('body').find('p').addClass('fadeIntoView').css('top',$cssTopValue);
	
		function fade(){
			$('body').find('p').removeClass('fadeIntoView').addClass('fadeFromView');
		}
		
		function removeElement(){
			$('body').find('p').remove();
		}
		setTimeout(fade,4000);
		setTimeout(removeElement,6000);
	}
	
	function loadData(xml){ //'success' in a callback context is still valid and acceptable; .success() as a chained method following $.ajax() is deprecated.
		var $statsList=['jeopardyTotalPrize','doubleJeopardyTotalPrize','totalPrize',
						'jeopardyCorrect','doubleJeopardyCorrect','totalCorrect'
		];
		
		var $playerNames=[]; 
		var $allObservations=[]; 
															
		for (var $i=0;$i<$(xml).find($statsList[$eventTargetID]).length;$i++){
			var $name=$(xml).find($statsList[$eventTargetID]).eq($i).parent().attr('name');
			var $value=$(xml).find($statsList[$eventTargetID]).eq($i).text();
										
			//Populate array with all the names and values from "playerstats.xml".
			$playerNames.push($name); 
			$allObservations.push($value); 
		}
								
		$allObservations.sort(function(a,b){ 
			return b-a;
		}).splice(9,$allObservations.length-10);
		
		var $dynamicallyGeneratedNameList=''; 
		var $dynamicallyGeneratedStatList='';
								
		for (var $i=0;$i<$allObservations.length;$i++){
			if ($allObservations[$i]<0){
				$allObservations[$i]=$allObservations[$i]*(-1);
				$dynamicallyGeneratedStatList+='<li class="fadeIntoView shiftLeft">-$'+$allObservations[$i]+'</li>';
			} else {
				$dynamicallyGeneratedStatList+='<li class="fadeIntoView">$'+$allObservations[$i]+'</li>';	
			}
			var $originalIndexPosition=$allObservations.indexOf($allObservations[$i]);
			$dynamicallyGeneratedNameList+='<li class="fadeIntoView">'+$playerNames[$originalIndexPosition]+'</li>';
		}												
		$('body').find('section').eq($eventTargetID).find('ol').html($dynamicallyGeneratedNameList);
		$('body').find('section').eq($eventTargetID).find('ul').html($dynamicallyGeneratedStatList);
	}
	
	$.ajax({
		url: 'data/playerstats.xml',
		complete: displayMessage,
		success: loadData,
		fail: function(){
				var $cssTopValue=$eventTarget.offset().top+10; //Ensure that the loading message always appears in the window by finding the event target's top coordinate value.
				$('body').append('<p>SORRY, THERE WAS AN AJAX ERROR.</p>');
				$('body').find('p').addClass('fadeIntoView').css('top',$cssTopValue);
		}
	});
}