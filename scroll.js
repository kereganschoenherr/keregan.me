$(function(){
var delta = 0;
$(document).on('mousewheel',function(event){

	delta = event.originalEvent.wheelDelta;

	//console.log(event.originalEvent.wheelDelta);
	

});


var fading = false;

var color1_1 = 'rgb(116,235,213)';
var color1_2 = 'rgb(172,182,229)';

var color2_1 = 'rgb(242,153,74)';
var color2_2 = 'rgb(242,201,76)';

var color3_1 = 'rgb(106,130,251)';
var color3_2 = 'rgb(252,92,125)';

var color4_1 = 'rgb(10,10,10)';
var color4_2 = 'rgb(35,35,35)';
var currentColors = [];
currentColors.push(color1_1);
currentColors.push(color1_2);

function updateGradient(color1,color2,target1,target2){
	fading = true;

	var splitColor1 = color1.split(',');
	var splitColor2 = color2.split(',');
	var splitTarget1 = target1.split(',');
	var splitTarget2 = target2.split(',');
	var target1 = target1;
	var target2 = target2;



	var r1_1 = parseInt(splitColor1[0].slice(4));
	var g1_1 = parseInt(splitColor1[1]);
	var b1_1 = parseInt(splitColor1[2]);
	var r1_2 = parseInt(splitColor2[0].slice(4));
	var g1_2 = parseInt(splitColor2[1]);
	var b1_2 = parseInt(splitColor2[2]);
	var r2_1 = parseInt(splitTarget1[0].slice(4));
	var g2_1 = parseInt(splitTarget1[1]);
	var b2_1 = parseInt(splitTarget1[2]);
	var r2_2 = parseInt(splitTarget2[0].slice(4));
	var g2_2 = parseInt(splitTarget2[1]);
	var b2_2 = parseInt(splitTarget2[2]);




	
	
	currentColors = [target1,target2];
	
	fadeGradient(r1_1,g1_1,b1_1,r1_2,g1_2,b1_2,r2_1,g2_1,b2_1,r2_2,g2_2,b2_2,target1,target2);
	fading = false;
	return currentColors;


}
function fadeGradient(r1_1,g1_1,b1_1,r1_2,g1_2,b1_2,r2_1,g2_1,b2_1,r2_2,g2_2,b2_2,target1,target2){
	setTimeout(function(){

		r1_1 = changeValue(r1_1,r2_1);
		r1_2 = changeValue(r1_2,r2_2);
		g1_1 = changeValue(g1_1,g2_1);
		g1_2 = changeValue(g1_2,g2_2);
		b1_1 = changeValue(b1_1,b2_1);
		b1_2 = changeValue(b1_2,b2_2);
		
		
		

		var color1 = 'rgb('+r1_1+','+g1_1+','+b1_1+')';
		var color2 = 'rgb('+r1_2+','+g1_2+','+b1_2+')';
		
				$('body').css("background", "linear-gradient(to bottom right, "+color1+","+color2+")");
		if( color1 != target1 || color2 != target2){
			
		fadeGradient(r1_1,g1_1,b1_1,r1_2,g1_2,b1_2,r2_1,g2_1,b2_1,r2_2,g2_2,b2_2,target1,target2);
	}
		else{
			
			return;
		}
	},10);



	

}
function changeValue(x,y){

	if(x > y){
		x -= 1;
	}
	else if(x < y){
		x += 1;
	}

	return x;

}

function updateBio(index){
	if(index == 0){
		$('#project_bio').html('<p>Sheridan Interiors, a small design studio, was seeking to modernize their dated website. I designed and built a new site from the ground up that would show off their recent projects.</p><p><i>{ HTML5, CSS3, JavaScript, JQuery, Sketch }</i></p>');
		$('#feature_img').attr('src','images/SheridanCard.png');
	}
	else if(index == 1){
		
		$('#project_bio').html('<p>I am currently working with a small team of students to develop an educational web-based application for UConn\'s Medical Laboratory Sciences program. The goal is to create a quiz that allows students to reinforce their skills in identifying bone marrow and various blood cells based on images, and send their performance statistics to the professor. I am leading the front-end development and visual design of the project.</p><p><i>{ HTML5, CSS3, JavaScript, JQuery, Sketch }</i></p>');
		$('#feature_img').attr('src','images/Questions.jpg');
	}
}

var currentPage = '#landingText';
var targetPage = '';
var activeButton = '#HomeButton';

$('#buttonList li').click(function(){
	if(!fading){
	if($(this).index() == 0){
		targetPage = '#landingText';
		currentButton = '#HomeButton';
		currentColors = updateGradient(currentColors[0],currentColors[1],color1_1,color1_2);
	}
	else if($(this).index() == 1){
		targetPage = '#skills';
		currentButton = '#SkillsButton';
		currentColors = updateGradient(currentColors[0],currentColors[1],color2_1,color2_2);
	}
	else if($(this).index() == 2){
		targetPage = '#work';
		currentButton = '#WorkButton';
		currentColors = updateGradient(currentColors[0],currentColors[1],color3_1,color3_2);



		$('#work li').removeClass('active_project').fadeIn(500);
		$('#project_feature').removeClass('active_feature');
		$('#project_bio').fadeOut(500);
		$('#work_headline').fadeIn(500);
	}
	else if($(this).index() == 3){
		targetPage = '#about';
		currentButton = '#AboutButton';
		currentColors = updateGradient(currentColors[0],currentColors[1],color4_1,color4_2);
	}
	else if($(this).index() == 4){
		targetPage = '#contact';
		currentButton = '#ContactButton';
	}
	if(currentPage != targetPage){
	$(currentPage).fadeOut(500);
	$('#buttonList li').not(this).removeClass('activeButton');
	$(this).addClass('activeButton');
	i
	$('.page').not(this).fadeOut(500);
	
	setTimeout( function(){
		$(targetPage).fadeIn(500);
		currentPage = targetPage;

	},500);
}
}
});

$('#work li').click(function(){
	$('#exit').css('visibility','visible').hide().fadeIn(1000);
	$(this).addClass('active_project');
	$('#work li').not(this).fadeOut(500);
	$('#work_headline').fadeOut(500);

	var projectIndex = $(this).index();
	updateBio(projectIndex);
	$('#project_feature').addClass('active_feature');
	$('#project_bio').css('visibility','visible').hide().fadeIn(1000);

	

});


$('#exit').click(function(){
	$(this).fadeOut(200);
	$('#work_headline').fadeIn(500);
	$('li').removeClass('active_project').fadeIn(500);
	$('#project_feature').removeClass('active_feature');
	$('#project_bio').fadeOut(500);

});



});











