$(document).ready(function(){
	var gridSize = 16;
	var chosenColor = '#333333';
	var mouseDown = false;

	$(document).mousedown(function() {
		mouseDown = true;
	});
	$(document).mouseup(function() {
		mouseDown = false;
	});


	//function to build blank screen 

	var makeGrid = function(size) {
		$('div#screen').empty();
		for(var i=0; i<(size*size); ++i){
			$('div#screen').append('<div class="pix"></div>');
		}		
		var gridPixSize = (500/size);
		$('div.pix').height(gridPixSize).width(gridPixSize).css({"background-color":"#d9d9d9"});
	};
	makeGrid(gridSize);

	//function to get color choice from user

	$('button.colorPick').on('click', function() {
   	   chosenColor = $(this).attr('id');
	});

	//function to do standard trail

	$('#standard').click(function() {
		$('div.pix').mouseenter(function() {
			if(mouseDown) {
				$(this).css({"background-color": chosenColor});
			}
		});
	});

	//function to do random color trail

	$('#random').click(function() {
		$('div.pix').mouseenter(function() {
			if(mouseDown) {
				var value = "#" + ("00000" + Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6);
				$(this).css("background-color", value);
			}
		});
	});

	//function to get user input for number of rows & columns other than initial value set at 16

	$('#resolution').click(function() {
		$('div#screen').empty();
		gridSize = 0;
		var count = 0;
		do {
			gridSize = prompt("Enter the resolution of your sketch screen.", "[Up to 128 max]");
			count += 1;
		} while (gridSize < 1 || gridSize > 128 && count < 5);
		if (count > 4) {
			alert("Me thinks you are way too stupid to sketch!! Click OK to agree.");
			makeGrid(2);
		} else {
			makeGrid(gridSize);
		}
	});

	//function to do gradient shading

	$('#shading').click(function() {
		$('div#screen').empty();
		makeGrid(gridSize);
		$('div.pix').css({'opacity': '0'});
		$('div.pix').mouseenter(function() {
			if(mouseDown) {
				$(this).css({'background-color': chosenColor}).animate({opacity: '+=0.1'});
			}
		});
	});

	//function to do disappearing mouse trail

	$('#trail').click(function() {
		$('div#screen').empty();
		makeGrid(gridSize);
		$('div.pix').mouseenter(function() {
			$(this).css({'background-color': chosenColor});
		});
		$('div.pix').mouseleave(function() {
			$(this).animate({opacity:'0'}, "slow");
		});
	});
		
	//function to 'clean' the sketch pad
	$('#clean').click(function() {
		$('div#screen').empty();
		makeGrid(gridSize);
	});
	
});