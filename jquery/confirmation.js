(function(){
function redirectToGameCurriculum(){
	if (localStorage.getItem('gameComplete')==='false' || 'null'){
		$('body').append('<div id="incomplete"><span>X</span><p>YOU CANNOT REVIEW GAME MATERIAL PRIOR TO COMPLETING THE GAME.</p></div>');
		$('#incomplete').addClass('fadeIntoView');
		$('#incomplete').css('top',$('button').eq(0).offset().top+30);
		
		function closeNotification(){
			$('#incomplete').removeClass('fadeIntoView').addClass('fadeFromView');
			
			function remove(){
				$('#incomplete').first().remove();
			}
			setTimeout(remove,2000);
		}
		
		$('#incomplete').first().on('click',closeNotification);
	} else {
		location.href='http://www.apushreviewgame.com/game-curriculum';
	}
}

function redirectToJeopardy(){
	location.href='http://www.apushreviewgame.com/jeopardy';
}

function redirectToAllTimeList(){
	location.href='http://www.apushreviewgame.com/all-time-list';
}

$('button').eq(0).on('click', redirectToGameCurriculum);
$('button').eq(1).on('click', redirectToJeopardy);
$('button').eq(2).on('click', redirectToAllTimeList);

function giveInfo(){
	console.log($(window).width());
}

$(window).on('resize',giveInfo);
})();