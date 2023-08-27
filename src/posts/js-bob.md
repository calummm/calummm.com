---
title: jsBob
subtitle:
started: '2023-08-27'
published: '2023-08-27'
category: 'Coding'
visible: false
tags:
  - webdev
description: A simple game I made
image: first-post
---

<style>
	h1 {color:white; font-variant:small-caps; margin:.25em 0; }
  #jsBob {width: 500px; height:500px; }
	#view {transform-origin: top left; -moz-transform: scale(2); -webkit-transform:scale(2); transform:scale(2); background:#666; position:relative; left:0; top:0; overflow:hidden; width:250px; height:250px; border:grey 1px solid;}
	#level { position:absolute;background:#eee; width:800px; height:500px; border:0px solid grey;}
	#deathCount, #fpsCount {position:absolute; top:1px;  padding:0 1px; font-size:10px; background:white; border:1px solid #ccc;}
	#deathCount {left:1px;}
	#fpsCount {min-width:32px; right:1px;}
	
	#player {position:absolute;}	
	#hat {height:2px; background:brown;}
	#hair {height:7px; width:2px; position:absolute; top:0; left:0px; background:brown;}
	#head {height:10px; background:#EECEB3; border-top:2px solid brown;}
	#body {height:11px; background:blue;}
	#leg {height:17px; background:#333;}
	
	.obstacle {position:absolute; background:#555; font-size:8px; color:white;}
	.platform {height:10px; width:100px;}
	.wall {width:10px; height:100%;}
	.block {background:orange; color:black;}	
	.stair {width:10px; height: 10px;background:orange; color:white;}	
	.enemy {position:absolute; display:block; background:red; width:10px; height: 10px;}
	
	.speach {color:white; position:absolute; font-size:8px; padding:5px 10px; margin:1em 0 3em; background:#f3961c; 
		background:-webkit-gradient(linear, 0 0, 0 100%, from(#2e88c4), to(#075698)); background:-moz-linear-gradient(#2e88c4, #075698);
		background:-o-linear-gradient(#2e88c4, #075698); background:linear-gradient(#2e88c4, #075698);
		-webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px; transition:opacity .25s linear;
	}
	.speach:after {content:""; position:absolute; top:20px; left:28px; border-width:7px 7px 0; border-style:solid; border-color:#075698  transparent; display:block; width:0;}
	
	.spinRight{-webkit-animation:spinR .5s linear infinite; -moz-animation:spinR .5s linear infinite; animation:spinR .5s linear infinite;}
	@-moz-keyframes spinR { 100% { -moz-transform: rotate(360deg); } }
	@-webkit-keyframes spinR { 100% { -webkit-transform: rotate(360deg); } }
	@keyframes spinR { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
	
	.spinLeft{-webkit-animation:spinL .5s linear infinite; -moz-animation:spinL .5s linear infinite; animation:spinL .5s linear infinite;}
	@-moz-keyframes spinL { 100% { -moz-transform: rotate(-360deg); } }
	@-webkit-keyframes spinL { 100% { -webkit-transform: rotate(-360deg); } }
	@keyframes spinL { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }
	
	.deathUp {animation:dU 1.5s ease-out 1}
	@-webkit-keyframes dU {100%{-webkit-transform:translate(0px, -150px) rotate(-1000deg) scale(0);}}
	@keyframes dU {100%{transform:translate(0px, -150px) rotate(-1000deg) scale(0);}}
	
	.deathDownRight {animation:ddr 1.5s ease-out 1}
	@-webkit-keyframes ddr {100%{-webkit-transform:translate(150px, 150px) rotate(1000deg) scale(0); }}
	@keyframes ddr {100%{transform:translate(150px, 150px) rotate(1000deg) scale(0);}}
	
	.deathDownLeft {-webkit-animation:ddl 1.5s ease-out 1; animation:ddl 1.5s ease-out 1;}
	@-webkit-keyframes ddl {100%{-webkit-transform:translate(-150px, 150px) rotate(-1000deg) scale(0);}}
	@keyframes ddl {100%{transform:translate(-150px, 150px) rotate(-1000deg) scale(0);}}
	
	.death #body {-webkit-animation:ddl 1s ease-out 1; animation:ddl 1s ease-out 1;}
	.death #head {-webkit-animation:dU 1s ease-out 1; animation:dU 1s ease-out 1;}
	.death #leg {-webkit-animation:ddr 1s ease-out 1; animation:ddr 1s ease-out 1;}
	
	.respawn #body {-webkit-animation:ddl 1s ease-out 1 reverse; animation:ddl 1s ease-out 1 reverse;}
	.respawn #head {-webkit-animation:dU 1s ease-out 1 reverse; animation:dU 1s ease-out 1 reverse;}
	.respawn #leg {-webkit-animation:ddr 1s ease-out 1 reverse; animation:ddr 1s ease-out 1 reverse;}
</style>

<div id="jsBob">
  <div id="view">

      <div id="level">

        <div id="plat1" class="obstacle platform" style="left: 80px; bottom: 80px;">plat1</div>
        <div id="wall1" class="obstacle wall" style="left: 0px; bottom: 0px;">wall1</div>
        <div id="wall2" class="obstacle wall" style="right: 0px; bottom: 0px;">wall2</div>
        <div id="block" class="obstacle block" style="width:40px; height:70px; left:180px; bottom:20px;">block</div>
        <div id="block2" class="obstacle block" style="width:40px; height:70px; left:230px; bottom:90px;">block2</div>
        <div id="plat2" class="obstacle platform" style="left: 220px; bottom: 130px;">plat2</div>
        <div id="block3" class="obstacle block" style="width:25px; height:10px; left:450px; bottom:220px;">block3</div>
        <div id="ground" class="obstacle ground" style="width:100%; height:20px; bottom:0px;">ground</div>
        <div id="block4" class="obstacle wall" style="width:10px; height:95px; left:20px; bottom:20px;"></div>

        <div class="obstacle platform" style="height:10px; width:50px; left:80px; bottom:190px;"></div>

        <span id="help1Show" class="speach">WASD to move!</span>
      </div>

      <div id="deathCount"></div>
      <div id="fpsCount"></div>

  </div>
</div>

<script lang="ts">
  import { browser } from '$app/environment';

if (browser) {

    (function (d2) {
    	var player = {},
    		key = {
    			jump: false,
    			right: false,
    			left: false
    		},
    		keyC = {
    			87: 'jump',
    			68: 'right',
    			65: 'left'
    		},
    		overlap = 5,
    		help1Show = true;
    		//enemyDivComp = window.getComputedStyle(document.getElementsByClassName('enemy')[0]);
    		/*enemy = {
    			x: parseInt(enemyDivComp.left) || 0,
    			y: parseInt(enemyDivComp.bottom) || 0,
    			width: parseInt(enemyDivComp.width) || 0,
    			height: parseInt(enemyDivComp.height) || 0
    		};*/
    		//console.log(enemy);

    	function copyObj (a) {
    		var b = {};
    		for (var i in a) {
    			b[i] = a[i];
    		}
    		return b;
    	}

    	function isCollide(a, b) {
    		return !(
    			((a.y + a.height) < (b.y)) ||
    			(a.y > (b.y + b.height)) ||
    			((a.x + a.width) < b.x) ||
    			(a.x > (b.x + b.width))
    		);
    	}

    	var enemy = [];
      var divComp;

    	function createEnemyTree () {
    		var divs = d2.level.getElementsByClassName('enemy'),
    			i = divs.length;
    		while (i--) {
    			divComp = window.getComputedStyle(divs[i]);
    			enemy.push({
    				id: divs[i].id,
    				x: parseInt(divComp.left) || parseInt(window.getComputedStyle(d2.level).width) - parseInt(divComp.right) - (parseInt(divComp.width) || 0) || 0,
    				y: parseInt(divComp.bottom) || 0,
    				width: parseInt(divComp.width) || 0,
    				height: parseInt(divComp.height) || 0
    			});
    		}
    	}

    	function enemyCollide() {
    		var i = enemy.length;
    		while (i--) {
    			if (isCollide(player, enemy[i])) return true;
    		}
    	}

    	function verCollide() {
    		var i,
    			ct = d2.colTree,
    			pLeft = player.x,
    			pRight = player.x + player.width,
    			pBot = player.y,
    			pTop = pBot + player.height,
    			objLeft,
    			objRight,
    			objBottom,
    			objTop;

    		for (i = 0; i < ct.length; i++) {

    			objBottom = ct[i].y;
    			objTop = objBottom + ct[i].height;

    			//Within vertical
    			if (pBot < objTop && pTop > objBottom) {

    				objLeft = ct[i].x;
    				objRight = objLeft + ct[i].width;

    				//Left collide
    				if (player.xv < 0 && pLeft < objRight && pLeft > objRight - overlap) {
    					//console.log('collide left:', ct[i].id);
    					return objRight;
    				}

    				//right collide
    				if (player.xv > 0 && pRight > objLeft && pRight < objLeft + overlap) {
    					//console.log('collide right:', ct[i].id);
    					return objLeft - player.width;
    				}
    			}
    		}
    	}

    	function horCollide() {
    		var i,
    			ct = d2.colTree,
    			pLeft = player.x,
    			pRight = player.x + player.width,
    			pBot = player.y,
    			pTop = pBot + player.height,
    			objLeft,
    			objRight,
    			objBottom,
    			objTop;

    		for (i = 0; i < ct.length; i++) {

    			objLeft = ct[i].x;
    			objRight = objLeft + ct[i].width;

    			//within horizontal
    			if (pLeft < objRight && pRight > objLeft) {

    				objBottom = ct[i].y;
    				objTop = objBottom + ct[i].height;

    				//bottom collide
    				if (player.yv < 0 && pBot < objTop && pBot > objTop - (overlap * 2)) {
    				//if (pBot < objTop && pBot > objTop - (overlap * 2)) {
    					//console.log('collide bottom:', ct[i].id);
    					return objTop;
    				}

    				//top collide
    				if (player.yv > 0 && pTop > objBottom && pTop < objBottom + overlap) {
    					//console.log('collide top:', ct[i].id);
    					return objBottom - player.height;
    				}
    			}
    		}
    	}

    	function createCollisionTree() {
    		//console.log('Creating collision tree');
    		var divs = d2.level.getElementsByTagName('div'),
    			i,
    			tree = [],
    			divComp;
    		for (i = 0; i < divs.length; i++) {

    			divComp = window.getComputedStyle(divs[i]);
    			tree.push({
    				id: divs[i].id,
    				x: parseInt(divComp.left) || parseInt(window.getComputedStyle(d2.level).width) - parseInt(divComp.right) - (parseInt(divComp.width) || 0) || 0,
    				y: parseInt(divComp.bottom) || 0,
    				width: parseInt(divComp.width) || 0,
    				height: parseInt(divComp.height) || 0
    			});
    		}
    		return tree;
    	}

    	var dead = false;

    	function tick () {
    		var verTestX,
    			verTestY,
    			wasDown;

    		//Hide the help on first move
    		if (help1Show) {
    			if (key.right || key.left || key.jump) {
    				help1Show = false;
    				document.getElementById('help1Show').style.opacity = 0;
    			}
    		}

    		if (!dead) {

    			if (enemyCollide()) {
    				d2.playerModel.classList.add('death');
    				player.xv = 0;
    				player.yv = 0;
    				d2.deaths++;
    				dead = true;

    				setTimeout(function () {
    					player = copyObj(d2.playerStart);
    					d2.playerModel.classList.remove('death');
    					setTimeout(function () {d2.playerModel.classList.add('respawn'); }, 25);
    					setTimeout(function () { d2.playerModel.classList.remove('respawn'); dead = false;}, 1025);
    				}, 1000);
    			}


    			if (player.yv !== 0) {
    				verTestY = horCollide();
    				if (verTestY) {
    					wasDown = player.yv < 0;
    					player.yv = 0;
    					player.y = verTestY;

    					//was down?
    					if (key.jump && wasDown) {
    						player.yv = 5.25;
    					}

    					if (!key.right && !key.left) player.xv *= .6;
    				}
    			}

    			if (player.xv !== 0) {
    				verTestX = verCollide();
    				if (verTestX) {
    					player.xv = 0;
    					player.x = verTestX;
    				}
    			}

    			if (!verTestX) {

    				if (key.right && player.xv < 5) {
    					player.xv += .15;
    				}
    				if (key.left && player.xv > -5) {
    					player.xv -= .15;
    				}

    				/*if ((key.right || key.left) && Math.abs(player.xv) < 5) {
    					if (key.right && player.xv < 5) {
    						player.xv += .15;
    					} else if ( {
    						player.xv -= .15;
    					}
    				}*/
    			}

    			if (!verTestY && player.yv > -9.5) {
    				player.yv -= .15;
    			}

    			if (player.xv > 0) {d2.hair.style.left = 0;}
    			if (player.xv < 0) {d2.hair.style.left = '8px';}

    			player.y += player.yv;
    			player.x += player.xv;
    		}
    		draw();
    	}
    	var prevTime = +new Date(),
    		fpsSmooth = 10;

    	function draw () {
    		var newTime;

    		//Update player position
    		d2.playerModel.style.left = player.x + 'px';
    		d2.playerModel.style.bottom = player.y + 'px';

    		//Update view position
    		//d2.level.style.left = -1 * (player.x - 115) + 'px';
    		//d2.level.style.bottom = (-1 * player.y + 80) + 'px';
    		var xDif = (parseInt(d2.level.style.left) - parseInt((-1 * (player.x - 115))));
    		var yDif = (parseInt(d2.level.style.bottom) - parseInt((-1 * (player.y - 80))));

    		if (xDif > 10) {
    			d2.level.style.left = parseInt(d2.level.style.left) - 10 + 'px';
    		} else if (xDif < -10) {
    			d2.level.style.left = parseInt(d2.level.style.left) + 10 + 'px';
    		} else {
    			d2.level.style.left = -1 * (player.x - 115) + 'px';
    		}

    		if (yDif > 15) {
    			d2.level.style.bottom = parseInt(d2.level.style.bottom) - 10 + 'px';
    		} else if (yDif < -15) {
    			d2.level.style.bottom = parseInt(d2.level.style.bottom) + 10 + 'px';
    		} else {
    			d2.level.style.bottom = -1 * (player.y - 80) + 'px';
    		}


    		//Update death count
    		d2.deathDisplay.innerHTML = "Deaths: " + d2.deaths;


    		fpsSmooth--;
    		if (fpsSmooth === 0) {
    			newTime = +new Date()
    			d2.fps.innerHTML = 'fps: ' + Math.round(1000 / ((newTime - prevTime) / 10));
    			prevTime = newTime;
    			fpsSmooth = 10;
    		}


    		//Call next tick cycle
    		window.requestAnimationFrame(tick);
    	}

    	d2.init = function () {
    		d2.playerStart = {
    			x: 40,
    			y: 20,
    			xv: 0,
    			yv: 0,
    			width: 10,
    			height: 40
    		};

    		//player = d2.playerStart;
    		player = copyObj(d2.playerStart);

    		d2.view = document.getElementById('view');
    		d2.level = document.getElementById('level');
    		d2.level.style.left = -1 * (player.x - 115) + 'px';
    		d2.level.style.bottom = (-1 * player.y + 80) + 'px';

    		var enemyBuildString = "",
    			numOfEnemy = 50,
    			width = parseInt(window.getComputedStyle(d2.level).width),
    			height = parseInt(window.getComputedStyle(d2.level).height);
    		while (numOfEnemy--){
    			enemyBuildString += '<span class="enemy spinLeft" style="left:' +
    				parseInt(Math.random() * (width - 60) + 60) + 'px; bottom:' +
    				parseInt(Math.random() * height) + 'px;"></span>';
    		}
console.log(d2.level.innerHTML)
    		d2.level.innerHTML += enemyBuildString;
console.log(d2.level.innerHTML)

    		d2.colTree = createCollisionTree();

    		createEnemyTree();
    		enemyCollide();

    		//console.log('Creating player');
    		d2.playerModel = document.createElement('div');
    		d2.playerModel.id = 'player';
    		d2.playerModel.innerHTML = '<div id="head"><div id="hair"></div></div>'+
    				'<div id="body"></div>' +
    				'<div id="leg"></div>';
    		d2.playerModel.style.height = player.height + 'px';
    		d2.playerModel.style.width = player.width + 'px';
    		d2.level.appendChild(d2.playerModel);
    		d2.hair = document.getElementById('hair');


    		var help1Show = document.getElementById('help1Show');
    		help1Show.style.left = player.x - 30 + 'px';
    		help1Show.style.bottom = player.y + 30 + 'px';


    		//console.log('Creating Event Listeners');
    		document.addEventListener('keydown', function (evt) {
    			key[keyC[evt.keyCode]] = true;
    		});
    		document.addEventListener('keyup', function (evt) {
    			key[keyC[evt.keyCode]] = false;
    		});

    		d2.deaths = 0;
    		d2.deathDisplay = document.getElementById('deathCount');
    		d2.fps = document.getElementById('fpsCount');

    		//Start the draw cycle
    		draw();
    	};
    })(window.d2 = window.d2 || {});

    d2.init();

}
</script>
