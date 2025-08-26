const level: HTMLDivElement = document.getElementById(
	'level'
) as HTMLDivElement;
const playerModel: HTMLDivElement = document.getElementById(
	'playerModel'
) as HTMLDivElement;
const enemies: HTMLDivElement = document.getElementById(
	'enemies'
) as HTMLDivElement;

interface BasicObject {
	y: number;
	x: number;
	width: number;
	height: number;
	hidden?: boolean;
}

interface Enemy extends BasicObject {
	id: string;
}

interface MovingObject extends BasicObject {
	xv: number;
	yv: number;
}

interface Player extends MovingObject {
	id?: string;
}

// This code is absolutely horrible. Do not copy except for a giggle.

const levelComp = window.getComputedStyle(level);
const levelWidth = parseInt(levelComp.width);
const levelHeight = parseInt(levelComp.height);
const deathDisplay = document.getElementById('deathCount');
const fps = document.getElementById('fpsCount');

let deaths = 0;

const playerStart: MovingObject = {
	x: 40,
	y: 20,
	xv: 0,
	yv: 0,
	width: 10,
	height: 40,
};

let player: Player = {
	...playerStart,
};

const action = {
	jump: false,
	right: false,
	left: false,
};

const key = {
	87: 'jump',
	68: 'right',
	65: 'left',
};

const overlap = 5;

let helpShow = true;

const objectsCollide = (a: BasicObject, b: BasicObject) =>
	!(
		a.y + a.height < b.y ||
		a.y > b.y + b.height ||
		a.x + a.width < b.x ||
		a.x > b.x + b.width
	);

playerModel.style.height = player.height + 'px';
playerModel.style.width = player.width + 'px';

const hair = document.getElementById('hair');

const setPlayerLocation = (x: number, y: number) => {
	playerModel.style.left = x + 'px';
	playerModel.style.bottom = y + 'px';
};
setPlayerLocation(player.x, player.y);

let numOfEnemy = 50;

let enemyBuildString = '';
while (numOfEnemy--) {
	enemyBuildString +=
		'<span class="enemy spinLeft" style="left:' +
		Number(Math.random() * (levelWidth - 60) + 60) +
		'px; bottom:' +
		Number(Math.random() * levelHeight) +
		'px;"></span>';
}
enemies.innerHTML = enemyBuildString;
// level.innerHTML += enemyBuildString;

const enemyList: Enemy[] = Array.from(
	level.getElementsByClassName('enemy')
).map((enemyEl): Enemy => {
	const enemyDiv: HTMLElement = enemyEl as HTMLElement;
	const enemyComp = window.getComputedStyle(enemyDiv as HTMLElement);

	return {
		id: enemyDiv.id,
		width: parseInt(enemyComp.width) || 0,
		height: parseInt(enemyComp.height) || 0,
		x:
			parseInt(enemyComp.left) ||
			parseInt(levelComp.width) -
				parseInt(enemyComp.right) -
				(parseInt(enemyComp.width) || 0) ||
			0,
		y: parseInt(enemyComp.bottom) || 0,
	} as Enemy;
});

const playerCollidedWithEnemy = () =>
	enemyList.some((enemy) => objectsCollide(player, enemy));

const createCollisionTree = () => {
	var divs = Array.from(level.getElementsByTagName('div')).filter(
			(div) => div.id !== 'player'
		),
		i,
		tree = [],
		divComp;

	for (i = 0; i < divs.length; i++) {
		divComp = window.getComputedStyle(divs[i]);
		tree.push({
			id: divs[i].id,
			x:
				parseInt(divComp.left) ||
				parseInt(levelComp.width) -
					parseInt(divComp.right) -
					(parseInt(divComp.width) || 0) ||
				0,
			y: parseInt(divComp.bottom) || 0,
			width: parseInt(divComp.width) || 0,
			height: parseInt(divComp.height) || 0,
		});
	}
	return tree;
};

const colTree = createCollisionTree();

const verCollide = () => {
	var i,
		ct = colTree,
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
				return objRight;
			}

			//right collide
			if (player.xv > 0 && pRight > objLeft && pRight < objLeft + overlap) {
				return objLeft - player.width;
			}
		}
	}
};

const horCollide = () => {
	var i,
		ct = colTree,
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
			if (player.yv < 0 && pBot < objTop && pBot > objTop - overlap * 2) {
				//if (pBot < objTop && pBot > objTop - (overlap * 2)) {

				return objTop;
			}

			//top collide
			if (player.yv > 0 && pTop > objBottom && pTop < objBottom + overlap) {
				return objBottom - player.height;
			}
		}
	}
};

var dead = false;

const tick = () => {
	var verTestX, verTestY, wasDown;

	//Hide the help on first move
	if (helpShow) {
		if (action.right || action.left || action.jump) {
			helpShow = false;
			const helpEl = document.getElementById('help1Show');
			if (helpEl) {
				helpEl.style.opacity = '0';
			}
		}
	}

	if (!dead && playerModel) {
		if (playerCollidedWithEnemy()) {
			playerModel.classList.add('death');
			player.xv = 0;
			player.yv = 0;
			deaths++;
			dead = true;

			setTimeout(function () {
				player = { ...player, ...playerStart };
				playerModel.classList.remove('death');
				setTimeout(function () {
					playerModel.classList.add('respawn');
				}, 25);
				setTimeout(function () {
					playerModel.classList.remove('respawn');
					dead = false;
				}, 1025);
			}, 1000);
		}

		if (player.yv !== 0) {
			verTestY = horCollide();
			if (verTestY) {
				wasDown = player.yv < 0;
				player.yv = 0;
				player.y = verTestY;

				//was down?
				if (action.jump && wasDown) {
					player.yv = 5.25;
				}

				if (!action.right && !action.left) player.xv *= 0.6;
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
			if (action.right && player.xv < 5) {
				player.xv += 0.15;
			}
			if (action.left && player.xv > -5) {
				player.xv -= 0.15;
			}

			/*if ((action.right || action.left) && Math.abs(player.xv) < 5) {
    					if (action.right && player.xv < 5) {
    						player.xv += .15;
    					} else if ( {
    						player.xv -= .15;
    					}
    				}*/
		}

		if (!verTestY && player.yv > -9.5) {
			player.yv -= 0.15;
		}

		if (player.xv > 0) {
			if (hair) {
				hair.style.left = '0';
			}
		}
		if (player.xv < 0) {
			if (hair) {
				hair.style.left = '8px';
			}
		}

		player.y += player.yv;
		player.x += player.xv;
	}
	draw();
};
var prevTime = +new Date(),
	fpsSmooth = 10;

const draw = () => {
	var newTime;

	//Update player position
	setPlayerLocation(player.x, player.y);
	// playerModel.style.left = player.x + 'px';
	// playerModel.style.bottom = player.y + 'px';

	//Update view position
	//level.style.left = -1 * (player.x - 115) + 'px';
	//level.style.bottom = (-1 * player.y + 80) + 'px';
	var xDif = parseInt(level?.style.left) - parseInt(-1 * (player.x - 115));
	var yDif = parseInt(level?.style.bottom) - parseInt(-1 * (player.y - 80));

	if (xDif > 10) {
		level.style.left = parseInt(level.style.left) - 10 + 'px';
	} else if (xDif < -10) {
		level.style.left = parseInt(level.style.left) + 10 + 'px';
	} else {
		level.style.left = -1 * (player.x - 115) + 'px';
	}

	if (yDif > 15) {
		level.style.bottom = parseInt(level.style.bottom) - 10 + 'px';
	} else if (yDif < -15) {
		level.style.bottom = parseInt(level.style.bottom) + 10 + 'px';
	} else {
		level.style.bottom = -1 * (player.y - 80) + 'px';
	}

	//Update death count
	if (deathDisplay) {
		deathDisplay.innerHTML = 'Deaths: ' + deaths;
	}

	fpsSmooth--;
	if (fpsSmooth === 0) {
		newTime = +new Date();
		if (fps) {
			fps.innerHTML = 'fps: ' + Math.round(1000 / ((newTime - prevTime) / 10));
		}
		prevTime = newTime;
		fpsSmooth = 10;
	}

	//Call next tick cycle
	window.requestAnimationFrame(tick);
};

const init = function () {
	player = { ...player, ...playerStart };

	level.style.left = -1 * (player.x - 115) + 'px';
	level.style.bottom = -1 * player.y + 80 + 'px';

	// colTree = createCollisionTree();

	const help1ShowEl = document.getElementById('help1Show');
	if (help1ShowEl) {
		help1ShowEl.style.left = player.x - 30 + 'px';
		help1ShowEl.style.bottom = player.y + 30 + 'px';
	}

	document.addEventListener('keydown', function (evt) {
		action[key[evt.keyCode]] = true;
	});
	document.addEventListener('keyup', function (evt) {
		action[key[evt.keyCode]] = false;
	});

	//Start the draw cycle
	draw();
};

init();
