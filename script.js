var graphics;
window.addEventListener("load", function () {
	graphics = new Graphics();
	var ctx = document.getElementById("canvas").getContext("2d");
	var imgWidth, imgHeight;
	var canvasWidth = 1000;
	var canvasHeight = 500;
	var scrollVal = 0;
	//------------------PARAMETRY GRY-----------------------------------
	var speed = 5;
	var spawnFrequency = 500;
	var fuelSpawnModifier = 0.001;
	var playerX = 490, playerY = 400;
	var fuelCount = 100;

	//-------------------DŹWIĘKI----------------------------------------
	var shotSound = document.getElementById("shotSound");
	var destroySound = document.getElementById("destroySound");
	var fuelSound = document.getElementById("fuelSound");

	var fastSound = document.getElementById("fastSound");
	var normalSound = document.getElementById("normalSound");
	var slowSound = document.getElementById("slowSound");

	normalSound.play();
	//-------------------RUCH GRACZA------------------------------------
	var moveLeft = false, moveRight = false, accelerate = false, slowDown = false;
	var leftInterval, rightInterval, accelerateInterval, slowInterval, shotInterval;
	window.addEventListener("keydown", function (event) {
		var code = event.which;            
		if (code == 87 && !accelerate) {
			accelerateInterval = setInterval(accel, 10);
			accelerate = true;                   
		}
		if (code == 83 && !slowDown) {
			slowInterval = setInterval(slow, 10);
			slowDown = true;
		}
		if (code == 65 && !moveLeft) {
			leftInterval = setInterval(mLeft, 10);
			moveLeft = true;
		}
		if (code == 68 && !moveRight) {
			rightInterval = setInterval(mRight, 10);
			moveRight = true;
		}
		if (code == 32 && bullet == undefined)
			shotInterval = setInterval(shot, 10);
			
	}, false)
	var bullet;
	window.addEventListener("keyup", function (event) {
		var code = event.which;
		console.log(code);
		if (code == 87) {
			clearInterval(accelerateInterval);
			accelerate = false;
		}
		if (code == 83) {
			clearInterval(slowInterval);
			slowDown = false;
		}
		if (code == 65) {
			clearInterval(leftInterval);
			moveLeft = false;
		}
		if (code == 68) {
			clearInterval(rightInterval);
			moveRight = false;
		}
		if (code == 32)
			clearInterval(shotInterval);
	}, false)
	function shot() {
		if (bullet == undefined) {
			bullet = new Bullet(ctx, playerY);
			shotSound.pause();
			shotSound.currentTime = 0;
			shotSound.play();
		}
	}
	function accel() {
		if(speed<8)
			speed += 0.05;
		console.log(speed);
	}
	function slow() {
		if(speed>3)
			speed -= 0.04
		console.log(speed);
	}
	function mLeft() {
		if (ctx.getImageData(playerX - 2, playerY + 25, 1, 1).data[2] != 0 &&
			ctx.getImageData(playerX - 2, playerY + 25, 1, 1).data[0] != 127)
			playerX -= 3;
	}
	function mRight() {
		if (ctx.getImageData(playerX + 52, playerY + 25, 1, 1).data[2] != 0 &&
			ctx.getImageData(playerX + 52, playerY + 25, 1, 1).data[0] != 127)
			playerX += 3;
	}
	//-------------------KOLIZJE Z ZIEMIĄ------------------------
	setInterval(function () {
		if (ctx.getImageData(playerX, playerY + 25, 1, 1).data[2] == 0||
			ctx.getImageData(playerX, playerY + 25, 1, 1).data[0] == 127)
			playerX += 4;
		if (ctx.getImageData(playerX + 50, playerY + 25, 1, 1).data[2] == 0 ||
			ctx.getImageData(playerX + 50, playerY + 25, 1, 1).data[0] == 127)
			playerX -= 4;
	}, 5)
	//-------------------SPAWN WROGÓW----------------------------
	var altcanvas=document.createElement("canvas");
	var altctx = altcanvas.getContext("2d");
	var enemies = [];
	function spawn() {
		var type = parseInt(Math.random() * 4 + fuelSpawnModifier);
		var uprightcorner = Math.round(Math.random() * 1000);
		if (scrollVal > imgHeight - 600) {
			if (altctx.getImageData(uprightcorner, scrollVal + 600 - imgHeight, 1, 1).data[0] == 63 && altctx.getImageData(uprightcorner + graphics.graphs[type][0].width, scrollVal + 600 + graphics.graphs[type][0].height - imgHeight, 1, 1).data[0] == 63) {
				if (uprightcorner + graphics.graphs[type][0].width / 2 < imgWidth / 2)
					enemies.push(new Spawn(uprightcorner, type, 0));
				else
					enemies.push(new Spawn(uprightcorner, type, 1));
			}
		}
		else {

			if (altctx.getImageData(uprightcorner, imgHeight - scrollVal - 600, 1, 1).data[0] == 63 && altctx.getImageData(uprightcorner + graphics.graphs[type][0].width, imgHeight - scrollVal - 600 + graphics.graphs[type][0].height, 1, 1).data[0] == 63) {
				if (uprightcorner + graphics.graphs[type][0].width / 2 < imgWidth / 2)
					enemies.push(new Spawn(uprightcorner, type, 0));
				else
					enemies.push(new Spawn(uprightcorner, type, 1));
			}
		}
		setTimeout(spawn, Math.round(Math.random() * spawnFrequency));
	}
	graphics.graphs[5].onload = loadImage;
	function loadImage() {
		imgWidth = graphics.graphs[5].width;
		imgHeight = graphics.graphs[5].height;
		altcanvas.width = imgWidth;
		altcanvas.height = imgHeight;
		altctx.drawImage(graphics.graphs[5], 0, 0, imgWidth, imgHeight);
		spawn();
		render();              
	}
	var imgData;
	var planeWidth = 50;
	var gameover = false;
	var points = 0;
	function render() {

		if (speed < 4 && slowSound.paused) {
			normalSound.pause();
			slowSound.play();
		}
		if (speed > 4 && speed < 6 && normalSound.paused) {
			fastSound.pause();
			slowSound.pause();
			normalSound.play();
		}
		if (speed > 6 && fastSound.paused) {
			normalSound.pause();
			fastSound.play();
		}
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		if (scrollVal >= imgHeight - speed) {
			scrollVal = 0;
		}
		scrollVal += speed;
		if (scrollVal + canvas.height > imgHeight) {
			
			imgData = altctx.getImageData(0, imgHeight+ (imgHeight- scrollVal - canvas.height), imgWidth, canvas.height);
			ctx.putImageData(imgData, 0, 0);
			imgData = altctx.getImageData(0, 0, imgWidth, canvas.height);
			ctx.putImageData(imgData, 0, -(imgHeight - scrollVal - canvas.height));
			
		}

		else {
			imgData = altctx.getImageData(0, imgHeight - scrollVal - canvas.height, imgWidth, canvas.height);
			ctx.putImageData(imgData, 0, 0);
		}
		//-- Potworne lagi
		//ctx.drawImage(graphics.graphs[5], 0, imgHeight - scrollVal, imgWidth, scrollVal, 0, 0, imgWidth, scrollVal);
		//ctx.drawImage(graphics.graphs[5], 0, scrollVal, imgWidth, imgHeight);               
		//-------------------ZMIANA POZYCJI POCISKU--------------------
		if (bullet != undefined)
		{
			bullet.chgBltPos();
			ctx.drawImage(graphics.graphs[7], playerX + 21.5, bullet.y);
			if (bullet.y <= 0)
				bullet = undefined;
		}
		//------------------KONIEC PALIWA------------------------------
		if (fuelCount <= 0) {
			ctx.drawImage(graphics.graphs[6], playerX, playerY);
			gameover = true;
			destroySound.pause();
			destroySound.currentTime = 0;
			destroySound.play();
		}
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i] != undefined) {
				//------------------SPRAWDZENIE TRAFIENIA-------------------
				if (bullet != undefined && !enemies[i].destroyed) {
					if (playerX+21.5>=enemies[i].corner&&playerX+21.5<=enemies[i].corner+graphics.graphs[enemies[i].type][enemies[i].turn].width&&
						bullet.y >= enemies[i].r && bullet.y <= enemies[i].r + graphics.graphs[enemies[i].type][enemies[i].turn].height) 
					{
						enemies[i].destroyed = true;
						bullet = undefined;
						destroySound.pause();
						destroySound.currentTime = 0;
						destroySound.play();
						points += 100;
						document.getElementById("points").innerHTML=points;
					}
				}                       
				//------------------ZMIANA POZYCJI----------------                        
				if (!enemies[i].destroyed) {
					enemies[i].moveplane(); //w poziomie
					ctx.drawImage(graphics.graphs[enemies[i].type][enemies[i].turn], enemies[i].corner, enemies[i].r);// w pionie
				}
				else
					ctx.drawImage(graphics.graphs[6], enemies[i].corner, enemies[i].r);

				enemies[i].r += speed;
				//------------------KOLIZJA GRACZA Z WORGIEM--------------- napisane dla lewego skrzydla, ale zdaje sie dzialac                       
				if (!enemies[i].destroyed && playerX < enemies[i].corner + graphics.graphs[enemies[i].type][enemies[i].turn].width &&
					playerX + 50 > enemies[i].corner && playerY + 25 >= enemies[i].r &&
					playerY + 25 <= enemies[i].r + graphics.graphs[enemies[i].type][enemies[i].turn].height) {
					if (enemies[i].type == 3) {
						fuelCount += 2;
						fuelSound.play();
						if (fuelCount > 100)
							fuelCount = 100;
					}
					else {
						ctx.drawImage(graphics.graphs[6], playerX, playerY);
						gameover = true;
						destroySound.pause();
						destroySound.currentTime = 0;
						destroySound.play();
						normalSound.pause();
						fastSound.pause();
						slowSound.pause();
					}
				}
				else {
					if (!fuelSound.paused) {
						fuelSound.pause();
						fuelSound.currentTime = 0;
					}
				}
				//-----------------USUWANIE ELEMENTÓW-----------------------
				if (enemies[i].r > 550) {
					enemies.splice(i, 1);
					if (enemies[i]!=undefined)
						enemies[i].r += speed; // wyrównanie następnego (inaczej jego index spada i "przeskakuje"
				}
				
			}
		}
		if (gameover)
			return;
		//-------------------ZMIANA POZYCJI GRACZA--------------------
		if (!moveLeft && !moveRight)
			ctx.drawImage(graphics.graphs[4][0], playerX, playerY);
		else if (moveRight)
			ctx.drawImage(graphics.graphs[4][1], playerX, playerY);
		else
			ctx.drawImage(graphics.graphs[4][2], playerX, playerY);
		fuelCount -= 0.05;
		document.getElementById("fl_status").style.left=140*fuelCount/100+"px";
		setTimeout(function () { render(); }, 10);
	}
}, false);