//initialise canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//the game mode of choice
var modus;
var g1; var g2; var g3; var g4; var g5;
//g1 = snijdertje, g2 = solo, g3 = duo, g4 = team g5 = versus

//X & Y values of the balls
var xPosPurple; var yPosPurple;
var xPosBlue; var yPosBlue;
var xPosRed; var yPosRed;

//direction values
var moveBlue;
var moveRed;
var movePurple;

//will call the draw function every 5 milliseconds
var refresh;

//controls
var zqsd = true;


//SNIJDERTJE variables
var hunter = "Purple";
var prey = "blue";
var other = "red";
var xPosHunter = xPosPurple; var yPosHunter = yPosPurple;
var xPosPrey = xPosBlue; var yPosPrey = yPosBlue;
var xPosOther = xPosRed; var yPosOther = yPosRed;
var blueScore = 0; var redScore = 0; var PurpleScore = 0;


//SOLO, DUO, TEAM variables
var drawCount = 0;
var ballCount = -1;
var enemyYposArray = []; var enemyXposArray = [];
var blueHit = false; var redHit = false;
var ballCountBlue = 0; var ballCountRed = 0; var ballCountDiff = 0;
var eatCount = 0;
var blueCountDuo = 0; var redCountDuo = 0;


//VERSUS variables
var blueShoot; var redShoot;
var xPosShootArray = []; var yPosShootArray = [];
var shootArrayDirection = []; var shootArrayColor = [];
var shootCount = 0; var shootCountBlue = 0; var shootCountRed = 0;
var hold = [false, false, false, false, false, false, false, false];
var distanceBalls = [];
var ballStop = [];
var blueCountVersus = 0; var redCountVersus = 0;


function start (){
	//set canvas fullscreen
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	//reset values
	hunter = "Purple";
	prey = "blue";
	other = "red";
	xPosHunter = xPosPurple; yPosHunter = yPosPurple;
	xPosPrey = xPosBlue; yPosPrey = yPosBlue;
	xPosOther = xPosRed; yPosOther = yPosRed;
	blueScore = 0; redScore = 0; PurpleScore = 0;

	drawCount = 0;
	ballCount = -1;
	enemyYposArray = []; enemyXposArray = [];
	blueHit = false; redHit = false;
	ballCountBlue = 0; ballCountRed = 0; ballCountDiff = 0;
	eatCount = 0;
	blueCountDuo = 0; redCountDuo = 0;

	blueShoot; redShoot;
	xPosShootArray = []; yPosShootArray = [];
	shootArrayDirection = []; shootArrayColor = [];
	shootCount = 0; shootCountBlue = 0; shootCountRed = 0;
	hold = [false, false, false, false, false, false, false, false];
	distanceBalls = [];
	ballStop = [];
	blueCountVersus = 0; redCountVersus = 0;


	modus = prompt("Welke spelmodus wil je spelen? Solo(1), Duo(2), Team(3), Versus(4) of Snijdertje(5). Typ de naam of het nummer in om te kiezen, duw ESC om opnieuw te kiezen.");

	if(modus == "1" || modus == "Solo"  || modus == "solo"){
		g1 = false; g2 = true; g3 = false; g4 = false; g5 = false;
		alert("Dit is een spelmodus voor 1 speler, bestuurd door de pijltjes toetsen.");
		alert("Het doel van het spel is om zo lang mogelijk te overleven door de paarse ballen to ontwijken.");
		startSolo();
	}
	else if(modus == "2" || modus == "Duo"  || modus == "duo"){
		g1 = false; g2 = false; g3 = true; g4 = false; g5 = false;
		alert("Dit is een spelmodus voor 2 spelers, bestuurd door de ZQSD (Duw C om tussen ZQSD en WASD te switchen.) en de pijltjes toetsen.");
		alert("Het doel van het spel is om zo lang mogelijk te overleven door de paarse ballen to ontwijken, en om langer te leven dan de andere.");
		startDT();
	}
	else if(modus == "3" || modus == "Team"  || modus == "team"){
		g1 = false; g2 = false; g3 = false; g4 = true; g5 = false;
		alert("Dit is een spelmodus voor 2 spelers, bestuurd door de ZQSD (Duw C om tussen ZQSD en WASD te switchen.) en de pijltjes toetsen.");
		alert("Het doel van het spel is om zo lang mogelijk te overleven door de paarse ballen to ontwijken, maar je moet samenwerken met de rode bal, want die kan de ballen opeten.");
		startDT();
	}
	else if(modus == "4" || modus == "Versus"  || modus == "versus"){
		g1 = false; g2 = false; g3 = false; g4 = false; g5 = true;
		alert("Dit is een spelmodus voor 2 spelers, bestuurd door de ZQSD (Duw C om tussen ZQSD en WASD te switchen.) en de pijltjes toetsen.");
		alert("Het doel van het spel is om de andere speler neer te schieten door in een richting te duwen terwijl je al in die richting aan het bewegen bent. Iedere speler heeft een maximum van 50 ballen, als je meer dan 50 ballen schiet word je oudste bal verwijderd");
		startVersus();
	}
	else if(modus == "5" || modus == "Snijdertje"  || modus == "snijdertje"){
		g1 = true; g2 = false; g3 = false; g4 = false; g5 = false;
		alert("Dit is een spelmodus voor 3 spelers, bestuurd door de ZQSD (Duw C om tussen ZQSD en WASD te switchen.) toetsen, pijltjes toetsen en de 5, 1, 2, 3 toetsen (op een numpad). Het is aangeraden om een tweede toetsenbord te koppelen om dit te spelen.");
		alert("De regels van het spel zijn als volgt: Je hebt een jager (Groene circel rond de bal), een prooi (De bal die aan de lijn vastzit maar geen circel rond zich heeft) en een helper. Het doel van de jager is om de prooi te vangen, het doel van de prooi en de helper is om niet gepakt te worden. De helper kan de prooi helpen door de groene lijn te doorkruisen, hierdoor wordt hij de prooi, en de prooi wordt de helper. De helper kan ook helpen door tegen de jager te botsen, waardoor ze allebei naar achter gestoten worden, pas alleen op voor de lijn, want als je daar in buurt komt kan je de prooi worden en gevangen worden door de jager.");
		startCut();
	}
	else{
		alert("Dat is geen optie.");
		start();
	}
}


//initialise "snijdertje"
function startCut (){
	//set canvas fullscreen
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	//positions for cut
	var margin = window.innerWidth - window.innerHeight;
	xPosPurple = window.innerWidth - margin / 2 - 50; yPosPurple = 80.9;
	xPosBlue = window.innerWidth - margin / 2 - 150; yPosBlue = window.innerHeight - 80.9;
	xPosRed = margin / 2 + 50; yPosRed = window.innerHeight / 2 - 80.9;

	//reset movement
	moveBlue = null;
	moveRed = null;
	movePurple = null;

	clearInterval(refresh);
	refresh = setInterval(draw, 5);
}

//initialise "solo"
function startSolo (){
	//set canvas fullscreen
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	//positions for solo
	xPosBlue = window.innerWidth / 2; yPosBlue = window.innerHeight / 2;

	//reset movement
	moveBlue = null;
	moveRed = null;
	movePurple = null;

	//reset values
	ballCount = -1;
	drawCount = 0;
	enemyYposArray = []; enemyXposArray = [];
	blueHit = false; redHit = false;
	ballCountBlue = 0; ballCountRed = 0; ballCountDiff = 0;
	eatCount = 0;

	clearInterval(refresh);
	refresh = setInterval(draw, 5);
}

//initialise "duo" or "team"
function startDT (){
	//set canvas fullscreen
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	//positions for duo and team
	xPosBlue = window.innerWidth / 3; yPosBlue = window.innerHeight / 2;
	xPosRed = window.innerWidth / 1.5; yPosRed = window.innerHeight / 2;

	//reset movement
	moveBlue = null;
	moveRed = null;
	movePurple = null;

	//reset values
	ballCount = -1;
	drawCount = 0;
	enemyYposArray = []; enemyXposArray = [];
	blueHit = false; redHit = false;
	ballCountBlue = 0; ballCountRed = 0; ballCountDiff = 0;
	eatCount = 0;

	clearInterval(refresh);
	refresh = setInterval(draw, 5);
}

//initialise "versus"
function startVersus (){
	//set canvas fullscreen
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	//positions for duo and team
	xPosBlue = window.innerWidth / 3; yPosBlue = window.innerHeight / 2;
	xPosRed = window.innerWidth / 1.5; yPosRed = window.innerHeight / 2;

	//reset movement
	moveBlue = null;
	moveRed = null;
	movePurple = null;

	//reset values
	blueShoot = null; redShoot = null;
	xPosShootArray = []; yPosShootArray = [];
	shootArrayDirection = []; shootArrayColor = [];
	shootCount = 0; shootCountBlue = 0; shootCountRed = 0;
	distanceBalls = [];
    ballStop = [];

	clearInterval(refresh);
	refresh = setInterval(draw, 5);
}



//checkKeyDown for detecting keypresses
document.onkeydown = checkKeyDown;

function checkKeyDown(e) {

    e = e || window.event;

    if(blueHit == false){
	    //arrow keys (blue)
	    if (e.keyCode == '38') {
	        //up arrow
	        if(g5 == true && moveBlue == "up" && hold[0] == false){
	        	blueShoot = "up";
	        	hold[0] = true;
	        }
	        moveBlue = "up";
	    }
	    else if (e.keyCode == '40') {
	        //down arrow
	        if(g5 == true && moveBlue == "down" && hold[1] == false){
	        	blueShoot = "down";
	        	hold[1] = true;
	        }
	        moveBlue = "down";
	    }
	    else if (e.keyCode == '37') {
	        //left arrow
	        if(g5 == true && moveBlue == "left" && hold[2] == false){
	        	blueShoot = "left";
	        	hold[2] = true;
	        }
	        moveBlue = "left";
	    }
	    else if (e.keyCode == '39') {
	        //right arrow
	        if(g5 == true && moveBlue == "right" && hold[3] == false){
	        	blueShoot = "right";
	        	hold[3] = true;
	        }
	        moveBlue = "right";
	    }
	}

    if((g1 == true || g3 == true || g4 == true || g5 == true) && redHit == false){
	    //z s q d (red)
	    if (e.keyCode == '90' && zqsd == true || e.keyCode == '87' && zqsd == false) {
	        //z (up) (w)
	        if(g5 == true && moveRed == "up" && hold[4] == false){
	        	redShoot = "up";
	        	hold[4] = true;
	        }
	        moveRed = "up";
	    }
	    else if (e.keyCode == '83') {
	        //s (down)
	        if(g5 == true && moveRed == "down" && hold[5] == false){
	        	redShoot = "down";
	        	hold[5] = true;
	        }
	        moveRed = "down";
	    }
	    else if (e.keyCode == '81'  && zqsd == true || e.keyCode == '65' && zqsd == false) {
	        //q (left) (a)
	        if(g5 == true && moveRed == "left" && hold[6] == false){
	        	redShoot = "left";
	        	hold[6] = true;
	        }
	        moveRed = "left";
	    }
	    else if (e.keyCode == '68') {
	        //d (right)
	        if(g5 == true && moveRed == "right" && hold[7] == false){
	        	redShoot = "right";
	        	hold[7] = true;
	        }
	        moveRed = "right";
	    }
	}


	if(g1 == true){
	    //5 2 1 3 (purple)
	    if (e.keyCode == '101') {
	        //5 (up)
	        movePurple = "up";
	    }
	    else if (e.keyCode == '98') {
	        //2 (down)
	        movePurple = "down";
	    }
	    else if (e.keyCode == '97') {
	        //1 (left)
	        movePurple = "left";
	    }
	    else if (e.keyCode == '99') {
	        //3 (right)
	        movePurple = "right";
	    }
	}

    
    //other
    if (e.keyCode == '32'){
        //spacebar
    }
    if (e.keyCode == '13'){
        //enter
    }
    if (e.keyCode == '67'){
        //c
        if(zqsd == true){
        	zqsd = false;
        }
        else if(zqsd == false){
        	zqsd = true;
        }
    }
    if (e.keyCode == '27'){
        //esc
        start();
    }
}

//checkKeyUp for detecting key releases
document.onkeyup = checkKeyUp;

function checkKeyUp(e) {

    e = e || window.event;

    if(blueHit == false){
	    //arrow keys (blue)
	    if (e.keyCode == '38') {
	        //up arrow
	        hold[0] = false;
	    }
	    else if (e.keyCode == '40') {
	        //down arrow
	        hold[1] = false;
	    }
	    else if (e.keyCode == '37') {
	        //left arrow
	        hold[2] = false;
	    }
	    else if (e.keyCode == '39') {
	        //right arrow
	        hold[3] = false;
	    }
	}

    if((g1 == true || g3 == true || g4 == true || g5 == true) && redHit == false){
	    //z s q d (red)
	    if (e.keyCode == '90' && zqsd == true || e.keyCode == '87' && zqsd == false) {
	        //z (up) (w)
	        hold[4] = false;
	    }
	    else if (e.keyCode == '83') {
	        //s (down)
	        hold[5] = false;
	    }
	    else if (e.keyCode == '81'  && zqsd == true || e.keyCode == '65' && zqsd == false) {
	        //q (left) (a)
	        hold[6] = false;
	    }
	    else if (e.keyCode == '68') {
	        //d (right)
	        hold[7] = false;
	    }
	}
}



function draw (){
	context.clearRect(0, 0, canvas.width, canvas.height);

	//move balls
	if(moveBlue == "up"){
		if(yPosBlue >= 15){
        	yPosBlue -= 3;
		}
	}
	else if(moveBlue == "down"){
		if(yPosBlue <= window.innerHeight - 15){
        	yPosBlue += 3;
		}
	}
	else if(moveBlue == "left"){
		if(xPosBlue >= 15){
		    xPosBlue -= 3;
	    }
	}
	else if( moveBlue == "right"){
		if(xPosBlue <= window.innerWidth - 15){
	    	xPosBlue += 3;
        }
	}

	if(moveRed == "up"){
		if(yPosRed >= 15){
        	yPosRed -= 3;
		}
	}
	else if(moveRed == "down"){
		if(yPosRed <= window.innerHeight - 15){
        	yPosRed += 3;
		}
	}
	else if(moveRed == "left"){
		if(xPosRed >= 15){
		    xPosRed -= 3;
	    }
	}
	else if( moveRed == "right"){
		if(xPosRed <= window.innerWidth - 15){
	    	xPosRed += 3;
        }
	}

	if(movePurple == "up"){
		if(yPosPurple >= 15){
        	yPosPurple -= 3;
		}
	}
	else if(movePurple == "down"){
		if(yPosPurple <= window.innerHeight - 15){
        	yPosPurple += 3;
		}
	}
	else if(movePurple == "left"){
		if(xPosPurple >= 15){
		    xPosPurple -= 3;
	    }
	}
	else if( movePurple == "right"){
		if(xPosPurple <= window.innerWidth - 15){
	    	xPosPurple += 3;
        }
	}

	//determine game mode
	if(g1 == true){
		drawCut();
	}
	else if(g2 == true){
		drawSDT();
	}
	else if(g3 == true){
		drawSDT();
	}
	else if(g4 == true){
		drawSDT();
	}
	else if(g5 == true){
		drawVersus();
	}
}

//snijdertje
function drawCut (){
	//determine hunter & prey positions
	if(prey == "blue"){
		xPosPrey = xPosBlue;
		yPosPrey = yPosBlue; 
		if(hunter == "Purple"){
			xPosOther = xPosRed; yPosOther = yPosRed; 
			xPosHunter = xPosPurple; yPosHunter = yPosPurple;
		} 
		else if(hunter == "red"){
			xPosOther = xPosPurple; yPosOther = yPosPurple;
			xPosHunter = xPosRed; yPosHunter = yPosRed;
		}
	}
	else if(prey == "red"){
		xPosPrey = xPosRed;
		yPosPrey = yPosRed; 
		if(hunter == "blue"){
			xPosOther = xPosPurple; yPosOther = yPosPurple; 
			xPosHunter = xPosBlue; yPosHunter = yPosBlue;
		} 
		else if(hunter == "Purple"){
			xPosOther = xPosBlue; yPosOther = yPosBlue;
			xPosHunter = xPosPurple; yPosHunter = yPosPurple;
		}
	}
	else if(prey == "Purple"){
		xPosPrey = xPosPurple;
		yPosPrey = yPosPurple;
		if(hunter == "blue"){
			xPosOther = xPosRed; yPosOther = yPosRed; 
			xPosHunter = xPosBlue; yPosHunter = yPosBlue;
		} 
		else if(hunter == "red"){
			xPosOther = xPosBlue; yPosOther = yPosBlue;
			xPosHunter = xPosRed; yPosHunter = yPosRed;
		}
	}

	//draw line
	context.fillStyle = "green"; 
	context.beginPath();
	context.moveTo(xPosHunter,yPosHunter);
	context.lineTo(xPosPrey,yPosPrey);
	context.lineWidth = 3;
	context.strokeStyle = "green";
	context.stroke();

	//draw blue, red and Purple ball
	context.fillStyle = "Purple"; 
	context.beginPath();
	context.arc(xPosPurple,yPosPurple,15,0,Math.PI*2);
	context.closePath();
	context.fill();
	if(hunter == "Purple"){
		context.strokeStyle = "green";
		context.lineWidth = 3;
		context.stroke();
	}

	context.fillStyle = "red"; 
	context.beginPath();
	context.arc(xPosRed,yPosRed,15,0,Math.PI*2);
	context.closePath();
	context.fill();
	if(hunter == "red"){
		context.strokeStyle = "green";
		context.lineWidth = 3;
		context.stroke();
	}

	context.fillStyle = "blue"; 
	context.beginPath();
	context.arc(xPosBlue,yPosBlue,15,0,Math.PI*2);
	context.closePath();
	context.fill();
	if(hunter == "blue"){
		context.strokeStyle = "green";
		context.lineWidth = 3;
		context.stroke();
	}

	//detect if a ball crossed the line
	if((((xPosOther >= xPosHunter && xPosOther <= xPosPrey) || (xPosOther <= xPosHunter && xPosOther >= xPosPrey)) && ((yPosOther >= yPosHunter && yPosOther <= yPosPrey) || (yPosOther <= yPosHunter && yPosOther >= yPosPrey)))){
		var xDiffOther = xPosOther - xPosHunter; var xDiffPrey = xPosPrey - xPosHunter;
		if(xDiffOther == 0){
			xDiffOther = 15;
		}
		if(xDiffPrey == 0){
			xDiffPrey = 15;
		}
		var yDiffOther = yPosOther - yPosHunter; var yDiffPrey = yPosPrey - yPosHunter;
		if(yDiffOther == 0){
			yDiffOther = 15;
		}
		if(yDiffPrey == 0){
			yDiffPrey = 15;
		}
		var xRatio = (Math.abs(xDiffOther) / Math.abs(xDiffPrey));
		var yRatio = (Math.abs(yDiffOther) / Math.abs(yDiffPrey));
		var xRatioRounded = xRatio.toFixed(1);
		var yRatioRounded = yRatio.toFixed(1);
		if(xRatioRounded == yRatioRounded){
			//change prey when line is crossed
			if(prey == "blue"){
				if(hunter == "Purple"){
					prey = "red";
					other = "blue";
				}
				else if(hunter == "red"){
					prey = "Purple";
					other = "blue";
				}
			}
			else if(prey == "red"){
				if(hunter == "Purple"){
					prey = "blue";
					other = "red";
				}
				else if(hunter == "blue"){
					prey = "Purple";
					other = "red";
				}
			}
			else if(prey == "Purple"){
				if(hunter == "blue"){
					prey = "red";
					other = "Purple";
				}
				else if(hunter == "red"){
					prey = "blue";
					other = "Purple";
				}
			}
		}
	}

	//detect collision between hunter & prey
	var xDistancePrey = xPosHunter - xPosPrey;
	var yDistancePrey = yPosHunter - yPosPrey;
	var distancePrey = xDistancePrey*xDistancePrey + yDistancePrey*yDistancePrey;

	//detect collision between hunter & other
	var xDistanceOther = Math.abs(xPosHunter - xPosOther);
	var yDistanceOther = Math.abs(yPosHunter - yPosOther);
	var distanceOther = xDistanceOther*xDistanceOther + yDistanceOther*yDistanceOther;

	//detect collision between hunter & other
	if(distanceOther < 1800){
		if(hunter == "blue"){
			moveBlue = null;
			if(xDistanceOther > yDistanceOther){
				if(xPosHunter >= xPosOther){
                    if(xPosBlue <= window.innerWidth - 25){
					   xPosBlue += 25;
                    }
				}
				else if(xPosHunter < xPosOther){
                    if(xPosBlue >= 25){
					   xPosBlue -= 25;
                    }
				}
			}
			else if(xDistanceOther < yDistanceOther){
				if(yPosHunter >= yPosOther){
                    if(yPosBlue <= window.innerHeight - 25){
					   yPosBlue += 25;
                    }
				}
				else if(yPosHunter < yPosOther){
                    if(yPosBlue >= 25){
					   yPosBlue -= 25;
                    }
				}
			}
		}
		else if(hunter == "red"){
			moveRed = null;
			if(xDistanceOther > yDistanceOther){
				if(xPosHunter >= xPosOther){
                    if(xPosRed <= window.innerWidth - 25){
					   xPosRed += 25;
                    }
				}
				else if(xPosHunter < xPosOther){
                    if(xPosRed >= 25){
					   xPosRed -= 25;
                    }
				}
			}
			else if(xDistanceOther < yDistanceOther){
				if(yPosHunter >= yPosOther){
                    if(yPosRed <= window.innerHeight - 25){
					   yPosRed += 25;
                    }
				}
				else if(yPosHunter < yPosOther){
                    if(yPosRed >= 25){
					   yPosRed -= 25;
                    }
				}
			}
		}
		else if(hunter == "Purple"){
			movePurple = null;
			if(xDistanceOther > yDistanceOther){
				if(xPosHunter >= xPosOther){
                    if(xPosPurple <= window.innerWidth - 25){
					   xPosPurple += 25;
                    }
				}
				else if(xPosHunter < xPosOther){
                    if(xPosPurple >= 25){
					   xPosPurple -= 25;
                    }
				}
			}
			else if(xDistanceOther < yDistanceOther){
				if(yPosHunter >= yPosOther){
                    if(yPosPurple <= window.innerHeight - 25){
					   yPosPurple += 25;
                    }
				}
				else if(yPosHunter < yPosOther){
					if(yPosPurple >= 25){
                        yPosPurple -= 25;
                    }
				}
			}
		}

		if(other == "blue"){
			moveBlue = null;
			if(xDistanceOther > yDistanceOther){
				if(xPosHunter >= xPosOther){
					if(xPosBlue >= 25){
                        xPosBlue -= 25;
                    }
				}
				else if(xPosHunter < xPosOther){
					if(xPosBlue <= window.innerWidth - 25){
                        xPosBlue += 25;
                    }
				}
			}
			else if(xDistanceOther < yDistanceOther){
				if(yPosHunter >= yPosOther){
					if(yPosBlue >= 25){
                        yPosBlue -= 25;
                    }
				}
				else if(yPosHunter < yPosOther){
					if(yPosBlue <= window.innerHeight - 25){
                        yPosBlue += 25;
                    }
				}
			}
		}
		else if(other == "red"){
			moveRed = null;
			if(xDistanceOther > yDistanceOther){
				if(xPosHunter >= xPosOther){
                    if(xPosRed >= 25){
					   xPosRed -= 25;
                    }
				}
				else if(xPosHunter < xPosOther){
                    if(xPosRed <= window.innerWidth - 25){
					   xPosRed += 25;
                    }
				}
			}
			else if(xDistanceOther < yDistanceOther){
				if(yPosHunter >= yPosOther){
					if(yPosRed >= 25){
                        yPosRed -= 25;
                    }
				}
				else if(yPosHunter < yPosOther){
                    if(yPosRed <= window.innerHeight - 25){
					   yPosRed += 25;
                    }
				}
			}
		}
		else if(other == "Purple"){
			movePurple = null;
			if(xDistanceOther > yDistanceOther){
				if(xPosHunter >= xPosOther){
                    if(xPosPurple >= 25){
					   xPosPurple -= 25;
                    }
				}
				else if(xPosHunter < xPosOther){
                    if(xPosPurple <= window.innerWidth - 25){
					   xPosPurple += 25;
                    }
				}
			}
			else if(xDistanceOther < yDistanceOther){
				if(yPosHunter >= yPosOther){
                    if(yPosPurple >= 25){
					   yPosPurple -= 25;
                    }
				}
				else if(yPosHunter < yPosOther){
                    if(yPosPurple <= window.innerHeight - 25){
					   yPosPurple += 25;
                    }
				}
			}
		}
	}

	//detect collision between hunter & prey
	if(distancePrey < 900){
		//change roles when a new game starts
		if(prey == "blue"){
			hunter = "blue"
			if(other == "red"){
				prey = "red";
				other = "Purple";
				blueScore++;
				alert("De jager heeft gewonnen en Blauw krijgt een strafpunt. Aantal strafpunten: Blauw: " + blueScore + " , Rood: " + redScore + " , Paars: " + PurpleScore + ".");
			}
			else if(other == "Purple"){
				prey = "Purple";
				other = "red";
				blueScore++;
				alert("De jager heeft gewonnen en Blauw krijgt een strafpunt. Aantal strafpunten: Blauw: " + blueScore + " , Rood: " + redScore + " , Paars: " + PurpleScore + ".");
			}
		}
		else if(prey == "red"){
			hunter = "red";
			if(other == "Purple"){
				prey = "Purple";
				other = "blue";
				redScore++;
				alert("De jager heeft gewonnen en Rood krijgt een strafpunt. Aantal strafpunten: Blauw: " + blueScore + " , Rood: " + redScore + " , Paars: " + PurpleScore + ".");
			}
			else if(other == "blue"){
				prey = "blue";
				other = "Purple";
				redScore++;
				alert("De jager heeft gewonnen en Rood krijgt een strafpunt. Aantal strafpunten: Blauw: " + blueScore + " , Rood: " + redScore + " , Paars: " + PurpleScore + ".");
			}
		}
		else if(prey == "Purple"){
			hunter = "Purple";
			if(other == "blue"){
				prey = "blue";
				other = "red";
				PurpleScore++;
				alert("De jager heeft gewonnen en Paars krijgt een strafpunt. Aantal strafpunten: Blauw: " + blueScore + " , Rood: " + redScore + " , Paars: " + PurpleScore + ".");
			}
			else if(other == "red"){
				prey = "red";
				other = "blue";
				PurpleScore++;
				alert("De jager heeft gewonnen en Paars krijgt een strafpunt. Aantal strafpunten: Blauw: " + blueScore + " , Rood: " + redScore + " , Paars: " + PurpleScore + ".");
			}
		}
		//start new game
		startCut();
	}
}

//duo, team or solo
function drawSDT (){
	if(blueHit == false){
		//draw blue
		context.fillStyle = "blue"; 
		context.beginPath();
		context.arc(xPosBlue,yPosBlue,15,0,Math.PI*2);
		context.closePath();
		context.fill();
	}

	if(g2 != true){
		if(redHit == false){
			//draw red
			context.fillStyle = "red"; 
			context.beginPath();
			context.arc(xPosRed,yPosRed,15,0,Math.PI*2);
			context.closePath();
			context.fill();
		}
	}

	//spawn enemies
	drawCount++;
	if(drawCount % 200 == 0){
		ballCount++;
        var random = Math.floor(Math.random() * 4) + 1;
        if(random == 1){
        	enemyXposArray.push(5); enemyYposArray.push(5);
        	context.fillStyle = "purple"; 
			context.beginPath();
			context.arc(enemyXposArray[ballCount],enemyYposArray[ballCount],5,0,Math.PI*2);
			context.closePath();
			context.fill();
        }
        else if(random == 2){
        	enemyXposArray.push(window.innerWidth - 5); enemyYposArray.push(5);
        	context.fillStyle = "purple"; 
			context.beginPath();
			context.arc(enemyXposArray[ballCount],enemyYposArray[ballCount],5,0,Math.PI*2);
			context.closePath();
			context.fill();
        }
        else if(random == 3){
        	enemyXposArray[ballCount] = 5; enemyYposArray[ballCount] = window.innerHeight - 5;
        	context.fillStyle = "purple"; 
			context.beginPath();
			context.arc(enemyXposArray[ballCount],enemyYposArray[ballCount],5,0,Math.PI*2);
			context.closePath();
			context.fill();
        }
        else if(random == 4){
        	enemyXposArray[ballCount] = window.innerWidth - 5; enemyYposArray[ballCount] = window.innerHeight - 5;
        	context.fillStyle = "purple"; 
			context.beginPath();
			context.arc(enemyXposArray[ballCount],enemyYposArray[ballCount],5,0,Math.PI*2);
			context.closePath();
			context.fill();
        }
    }

    //redraw enemies
    for(var i = 0; i < ballCount + 1; i++){
    	context.fillStyle = "purple"; 
		context.beginPath();
		context.arc(enemyXposArray[i],enemyYposArray[i],5,0,Math.PI*2);
		context.closePath();
		context.fill();
    }

    //home enemies
    if((g3 != true) || redHit == true){
	    for(var i = 0; i < 4; i++){
	    	if(enemyXposArray[ballCount - i] >= xPosBlue + 5){
	    		enemyXposArray[ballCount - i] -= 1.5;
	    	}
	    	else if(enemyXposArray[ballCount - i] <= xPosBlue - 5){
	    		enemyXposArray[ballCount - i] += 1.5;
	    	}

	    	if(enemyYposArray[ballCount - i] >= yPosBlue + 5){
	    		enemyYposArray[ballCount - i] -= 1.5;
	    	}
	    	else if(enemyYposArray[ballCount - i] <= yPosBlue - 5){
	    		enemyYposArray[ballCount - i] += 1.5;
	    	}
	    }
	}
	else if(blueHit == false){
		for(var i = 0; i < 4; i++){
			var xDistanceBlue = xPosBlue - enemyXposArray[ballCount - i];
			var yDistanceBlue = yPosBlue - enemyYposArray[ballCount - i];
			var distanceBlue = xDistanceBlue*xDistanceBlue + yDistanceBlue*yDistanceBlue;

			var xDistanceRed = xPosRed - enemyXposArray[ballCount - i];
			var yDistanceRed = yPosRed - enemyYposArray[ballCount - i];
			var distanceRed = xDistanceRed*xDistanceRed + yDistanceRed*yDistanceRed;

			if(distanceBlue <= distanceRed){
		    	if(enemyXposArray[ballCount - i] >= xPosBlue + 5){
		    		enemyXposArray[ballCount - i] -= 1.5;
		    	}
		    	else if(enemyXposArray[ballCount - i] <= xPosBlue - 5){
		    		enemyXposArray[ballCount - i] += 1.5;
		    	}

		    	if(enemyYposArray[ballCount - i] >= yPosBlue + 5){
		    		enemyYposArray[ballCount - i] -= 1.5;
		    	}
		    	else if(enemyYposArray[ballCount - i] <= yPosBlue - 5){
		    		enemyYposArray[ballCount - i] += 1.5;
		    	}
			}
			else {
		    	if(enemyXposArray[ballCount - i] >= xPosRed + 5){
		    		enemyXposArray[ballCount - i] -= 1.5;
		    	}
		    	else if(enemyXposArray[ballCount - i] <= xPosRed - 5){
		    		enemyXposArray[ballCount - i] += 1.5;
		    	}

		    	if(enemyYposArray[ballCount - i] >= yPosRed + 5){
		    		enemyYposArray[ballCount - i] -= 1.5;
		    	}
		    	else if(enemyYposArray[ballCount - i] <= yPosRed - 5){
		    		enemyYposArray[ballCount - i] += 1.5;
		    	}
			}
		}
	}
	else{
		for(var i = 0; i < 4; i++){
	    	if(enemyXposArray[ballCount - i] >= xPosRed + 5){
	    		enemyXposArray[ballCount - i] -= 1.5;
	    	}
	    	else if(enemyXposArray[ballCount - i] <= xPosRed - 5){
	    		enemyXposArray[ballCount - i] += 1.5;
	    	}

	    	if(enemyYposArray[ballCount - i] >= yPosRed + 5){
	    		enemyYposArray[ballCount - i] -= 1.5;
	    	}
	    	else if(enemyYposArray[ballCount - i] <= yPosRed - 5){
	    		enemyYposArray[ballCount - i] += 1.5;
	    	}
	    }
	}

    //collision detection
    if(g2 == true){
	    for(var i = 0; i < ballCount + 1; i++){
		    var xDistance = xPosBlue - enemyXposArray[i];
			var yDistance = yPosBlue - enemyYposArray[i];
			var distance = xDistance*xDistance + yDistance*yDistance;
			if(distance <= 200){
				ballCount++;
				alert("Je hebt " + ballCount + " ballen kunnen ontwijken.");
				startSolo();
			}
		}
	}
	else if(g3 == true){
		for(var i = 0; i < ballCount + 1; i++){
		    var xDistanceBlue = xPosBlue - enemyXposArray[i];
			var yDistanceBlue = yPosBlue - enemyYposArray[i];
			var distanceBlue = xDistanceBlue*xDistanceBlue + yDistanceBlue*yDistanceBlue;

			var xDistanceRed = xPosRed - enemyXposArray[i];
			var yDistanceRed = yPosRed - enemyYposArray[i];
			var distanceRed = xDistanceRed*xDistanceRed + yDistanceRed*yDistanceRed;

			if(distanceBlue <= 200){
				blueHit = true;
				xPosBlue = -15; yPosBlue = -15;
				ballCountBlue = ballCount + 1;
				if(redHit == true){
					blueCountDuo++;
					ballCountDiff = ballCountBlue - ballCountRed;
					alert("Rood heeft " + ballCountRed + " ballen kunnen ontwijken, maar Blauw is gewonnen door " + ballCountBlue + " ballen te ontwijken, " + ballCountDiff + " ballen meer. De scores zijn nu: Blauw: " + blueCountDuo + ", Rood: " + redCountDuo + ".");
					startDT();
				}
			}

			if(distanceRed <= 200){
				redHit = true;
				xPosRed = -15; yPosRed = -15;
				ballCountRed = ballCount + 1;
				if(blueHit == true){
					redCountDuo++;
					ballCountDiff = ballCountRed - ballCountBlue;
					alert("Blauw heeft " + ballCountBlue + " ballen kunnen ontwijken, maar Rood is gewonnen door " + ballCountRed + " ballen te ontwijken, " + ballCountDiff + " ballen meer. De scores zijn nu: Blauw: " + blueCountDuo + ", Rood: " + redCountDuo + ".");
					startDT();
				}
			}
		}
	}
	else{
		for(var i = 0; i < ballCount + 1; i++){
		    var xDistanceBlue = xPosBlue - enemyXposArray[i];
			var yDistanceBlue = yPosBlue - enemyYposArray[i];
			var distanceBlue = xDistanceBlue*xDistanceBlue + yDistanceBlue*yDistanceBlue;

			var xDistanceRed = xPosRed - enemyXposArray[i];
			var yDistanceRed = yPosRed - enemyYposArray[i];
			var distanceRed = xDistanceRed*xDistanceRed + yDistanceRed*yDistanceRed;

			if(distanceRed <= 200){
				eatCount++;
				enemyXposArray[i] = -1000; enemyYposArray[i] = -1000;
			}

			if(distanceBlue <= 200){
				ballCount++;
				alert("Blauw heeft " + ballCount + " ballen kunnen ontwijken, Rood heeft " + eatCount + " ballen kunnen opeten.");
				startDT();
			}
		}
	}
}

//versus
function drawVersus (){

	//draw blue
	context.fillStyle = "blue"; 
	context.beginPath();
	context.arc(xPosBlue,yPosBlue,15,0,Math.PI*2);
	context.closePath();
	context.fill();

	//draw red
	context.fillStyle = "red"; 
	context.beginPath();
	context.arc(xPosRed,yPosRed,15,0,Math.PI*2);
	context.closePath();
	context.fill();

	//redraw bullets
	for(var i = 0; i < shootCount + 1; i++){
    	context.fillStyle = shootArrayColor[i]; 
		context.beginPath();
		context.arc(xPosShootArray[i],yPosShootArray[i],10,0,Math.PI*2);
		context.closePath();
		context.fill();
    }


	if(blueShoot == "up"){
		xPosShootArray.push(xPosBlue); yPosShootArray.push(yPosBlue);
		shootArrayDirection.push("up");
		shootArrayColor.push("blue");
		context.fillStyle = "blue"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountBlue++;
		blueShoot = null;
        if(shootCountBlue > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "blue"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountBlue--;
                    break;
                }
            }
        }
	}
	else if(blueShoot == "down"){
		xPosShootArray.push(xPosBlue); yPosShootArray.push(yPosBlue);
		shootArrayDirection.push("down");
		shootArrayColor.push("blue");
		context.fillStyle = "blue"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountBlue++;
		blueShoot = null;
        if(shootCountBlue > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "blue"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountBlue--;
                    break;
                }
            }
        }
	}
	else if(blueShoot == "left"){
		xPosShootArray.push(xPosBlue); yPosShootArray.push(yPosBlue);
		shootArrayDirection.push("left");
		shootArrayColor.push("blue");
		context.fillStyle = "blue"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountBlue++;
		blueShoot = null;
        if(shootCountBlue > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "blue"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountBlue--;
                    break;
                }
            }
        }
	}
	else if(blueShoot == "right"){
		xPosShootArray.push(xPosBlue); yPosShootArray.push(yPosBlue);
		shootArrayDirection.push("right");
		shootArrayColor.push("blue");
		context.fillStyle = "blue"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountBlue++;
		blueShoot = null;
        if(shootCountBlue > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "blue"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountBlue--;
                    break;
                }
            }
        }
	}

	if(redShoot == "up"){
		xPosShootArray.push(xPosRed); yPosShootArray.push(yPosRed);
		shootArrayDirection.push("up");
		shootArrayColor.push("red");
		context.fillStyle = "red"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountRed++;
		redShoot = null;
        if(shootCountRed > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "red"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountRed--;
                    break;
                }
            }
        }
	}
	else if(redShoot == "down"){
		xPosShootArray.push(xPosRed); yPosShootArray.push(yPosRed);
		shootArrayDirection.push("down");
		shootArrayColor.push("red");
		context.fillStyle = "red"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountRed++;
		redShoot = null;
        if(shootCountRed > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "red"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountRed--;
                    break;
                }
            }
        }
	}
	else if(redShoot == "left"){
		xPosShootArray.push(xPosRed); yPosShootArray.push(yPosRed);
		shootArrayDirection.push("left");
		shootArrayColor.push("red");
		context.fillStyle = "red"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountRed++;
		redShoot = null;
        if(shootCountRed > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "red"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountRed--;
                    break;
                }
            }
        }
	}
	else if(redShoot == "right"){
		xPosShootArray.push(xPosRed); yPosShootArray.push(yPosRed);
		shootArrayDirection.push("right");
		shootArrayColor.push("red");
		context.fillStyle = "red"; 
		context.beginPath();
		context.arc(xPosShootArray[shootCount],yPosShootArray[shootCount],10,0,Math.PI*2);
		context.closePath();
		context.fill();
		shootCount++; shootCountRed++;
		redShoot = null;
        if(shootCountRed > 50){
            for(var z = 0; z < shootCount + 1; z++){
                if(shootArrayColor[z] == "red"){
                    xPosShootArray.splice(z, 1);
                    yPosShootArray.splice(z, 1);
                    shootArrayColor.splice(z, 1);
                    shootArrayDirection.splice(z,1);
                    var max = Math.max.apply(null, ballStop);
                    ballStop = ballStop.filter((e) => {return e != max});
                    distanceBalls.splice(z,1);
                    shootCount--;
                    shootCountRed--;
                    break;
                }
            }
        }
	}

	//move bullets
	for(var i = 0; i < shootCount; i++){
		for(var x = 0; x < shootCount; x++){
            if(ballStop.indexOf(i) == -1){
    			if(x != i){
    				var distanceXballs = Math.abs(xPosShootArray[x] - xPosShootArray[i]); var distanceYballs = Math.abs(yPosShootArray[x] - yPosShootArray[i]);
    				var ballDistance = distanceXballs*distanceXballs + distanceYballs*distanceYballs;
    				distanceBalls[i[x]] = ballDistance;
    			}

    			var ballCollision = false;

    			if(distanceBalls[i[x]] < 400){
    				ballCollision = true;
    				ballStop.push(i);
    			}

    			if((ballCollision == false || i == 0)){
    				if(shootArrayDirection[i] == "up"){
    					if(x == i){
    						if(yPosShootArray[i] >= 10){
    	       					yPosShootArray[i] -= 5;
    						}
                            else{
                                ballStop.push(i);
                            }
    					}
    				}
    				else if(shootArrayDirection[i] == "down"){
    					if(x == i){
    						if(yPosShootArray[i] <= window.innerHeight - 10){
           						yPosShootArray[i] += 5;
    						}
                            else{
                                ballStop.push(i);
                            }
    					}
    				}
    				else if(shootArrayDirection[i] == "left"){
    					if(x == i){
    						if(xPosShootArray[i] >= 10){
           						xPosShootArray[i] -= 5;
    						}
                            else{
                                ballStop.push(i);
                            }
    					}
    				}
    				else if(shootArrayDirection[i] == "right"){
    					if(x == i){
    						if(xPosShootArray[i] <= window.innerWidth - 10){
    	       					xPosShootArray[i] += 5;
    						}
                            else{
                                ballStop.push(i);
                            }
    					}
    				}
    			}
            }
		}

		//collision detection blue & red
		var blueDistanceX = Math.abs(xPosBlue - xPosShootArray[i]); var blueDistanceY = Math.abs(yPosBlue - yPosShootArray[i]);
		var blueDistance = blueDistanceX*blueDistanceX + blueDistanceY*blueDistanceY;
		var redDistanceX = Math.abs(xPosRed - xPosShootArray[i]); var redDistanceY = Math.abs(yPosRed - yPosShootArray[i]);
		var redDistance = redDistanceX*redDistanceX + redDistanceY*redDistanceY;

		if(redDistance < 400 && shootArrayColor[i] == "blue"){
			blueCountVersus++;
			alert("Blauw heeft gewonnen. De scores zijn nu: Blauw: " + blueCountVersus + ", Rood: " + redCountVersus + ".");
			startVersus();
		}
		if(blueDistance < 400 && shootArrayColor[i] == "red"){
			redCountVersus++;
			alert("Rood heeft gewonnen. De scores zijn nu: Blauw: " + blueCountVersus + ", Rood: " + redCountVersus + ".");
			startVersus();
		}
	}
}
