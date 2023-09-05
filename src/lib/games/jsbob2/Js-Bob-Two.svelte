<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let level: HTMLDivElement;
  let playerModel: HTMLDivElement;
  let enemies: HTMLDivElement;

  let canvas: HTMLCanvasElement;
  const viewWidth = 500;
  const viewHeight = 500;
  const levelWidth = 500;
  const levelHeight = 500;
  interface BasicObject {
    y: number;
    x: number;
    w: number;
    h: number;
    id?: string;
    hidden?: boolean;
  }

  interface LevelDataObject extends BasicObject {
    type: 'player' | 'ground' | 'block' | 'platform' | 'wall' | 'enemy';
    x: number;
    y: number;
    w: number;
    h: number;
    xv?: number;
    yv?: number;
  }

  interface LevelData {
    objects: LevelDataObject[];
  }

  let levelData: LevelData = {
    objects: [
      {
        type: 'player',
        x: 40,
        y: 50,
        w: 10,
        h: 40,
        xv: 0,
        yv: 0,
      },
      {
        type: 'wall',
        id: 'wall1',
        x: 0,
        y: 0,
        w: 10,
        h: 500,
      },
      {
        type: 'ground',
        id: 'ground1',
        x: 0,
        y: 0,
        w: 500,
        h: 10,
      },
      {
        type: 'block',
        id: 'block1',
        x: 180,
        y: 10,
        w: 40,
        h: 70,
      },
      {
        type: 'block',
        id: 'block2',
        x: 230,
        y: 80,
        w: 40,
        h: 70,
      },
      {
        type: 'platform',
        id: 'plat1',
        x: 80,
        y: 70,
        w: 100,
        h: 10,
      },
      {
        type: 'platform',
        id: 'plat2',
        x: 220,
        y: 120,
        w: 100,
        h: 10,
      },
      {
        type: 'platform',
        id: 'plat3',
        x: 220,
        y: 120,
        w: 100,
        h: 10,
      },
      {
        type: 'platform',
        id: 'plat4',
        x: 20,
        y: 10,
        w: 10,
        h: 95,
      },
      {
        type: 'platform',
        id: 'plat5',
        x: 80,
        y: 180,
        w: 50,
        h: 10,
      },
      {
        type: 'platform',
        id: 'plat6',
        x: 450,
        y: 210,
        w: 25,
        h: 10,
      },
    ],
  };

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

  // todo remove after updating leveldata
  levelData.objects = levelData.objects.map((object) => ({
    ...object,
    y: object.y * -1 + levelHeight - 10,
  }));

  // This code is absolutely horrible. Do not copy except for a giggle.

  onMount(() => {
    if (browser) {
      const playerData = levelData.objects.find(
        (object) => object.type === 'player'
      );
      const platformData = levelData.objects.filter((object) =>
        ['ground', 'platform', 'block', 'wall'].includes(object.type)
      );
      const enemyData = levelData.objects.filter(
        (object) => object.type === 'enemy'
      );

      canvas.height = viewHeight;
      canvas.width = viewWidth;

      console.log(canvas);
      const ctx = canvas.getContext('2d', { alpha: true });

      const deathDisplay = document.getElementById('deathCount');
      const fps = document.getElementById('fpsCount');

      let deaths = 0;

      const playerStart: MovingObject = {
        x: 40,
        y: 50,
        xv: 0,
        yv: 0,
        w: 10,
        h: 40,
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
          a.y + a.h < b.y ||
          a.y > b.y + b.h ||
          a.x + a.w < b.x ||
          a.x > b.x + b.w
        );

      let numOfEnemy = 20;

      while (numOfEnemy--) {
        enemyData.push({
          type: 'enemy',
          x: Math.random() * (levelWidth - 60) + 60,
          y: Math.random() * levelHeight,
          h: 10,
          w: 10,
        });
      }

      const playerCollidedWithEnemy = () =>
        enemyData.some((enemy) => objectsCollide(player, enemy));

      const colTree = platformData.concat(enemyData);

      const verCollide = () => {
        var i,
          ct = colTree,
          pLeft = player.x,
          pRight = player.x + player.w,
          pBot = player.y,
          pTop = pBot + player.h,
          objLeft,
          objRight,
          objBottom,
          objTop;

        for (i = 0; i < ct.length; i++) {
          objBottom = ct[i].y;
          objTop = objBottom + ct[i].h;

          //Within vertical
          if (pBot < objTop && pTop > objBottom) {
            objLeft = ct[i].x;
            objRight = objLeft + ct[i].w;

            //Left collide
            if (
              player.xv < 0 &&
              pLeft < objRight &&
              pLeft > objRight - overlap
            ) {
              return objRight;
            }

            //right collide
            if (
              player.xv > 0 &&
              pRight > objLeft &&
              pRight < objLeft + overlap
            ) {
              return objLeft - player.w;
            }
          }
        }
      };

      const horCollide = () => {
        var i,
          ct = colTree,
          pLeft = player.x,
          pRight = player.x + player.w,
          pBot = player.y,
          pTop = pBot + player.h,
          objLeft,
          objRight,
          objBottom,
          objTop;

        for (i = 0; i < ct.length; i++) {
          objLeft = ct[i].x;
          objRight = objLeft + ct[i].w;

          //within horizontal
          if (pLeft < objRight && pRight > objLeft) {
            objBottom = ct[i].y;
            objTop = objBottom + ct[i].h;

            //bottom collide
            if (player.yv < 0 && pBot < objTop && pBot > objTop - overlap * 2) {
              //if (pBot < objTop && pBot > objTop - (overlap * 2)) {

              return objTop;
            }

            //top collide
            if (
              player.yv > 0 &&
              pTop > objBottom &&
              pTop < objBottom + overlap
            ) {
              return objBottom - player.h;
            }
          }
        }
      };

      var dead = false;

      const tick = () => {
        var verTestX, verTestY, wasDown;

        if (!dead) {
          if (playerCollidedWithEnemy()) {
            player.xv = 0;
            player.yv = 0;
            deaths++;
            dead = true;

            setTimeout(function () {
              player = { ...player, ...playerStart };
              //dead
              setTimeout(function () {
                //respawn
              }, 25);
              setTimeout(function () {
                //respawn end
                dead = false;
              }, 25);
            }, 500);
          }

          if (player.yv !== 0) {
            verTestY = horCollide();
            if (verTestY) {
              wasDown = player.yv > 0;
              player.yv = 0;
              player.y = verTestY;
              console.log(wasDown, player.yv);
              //was down?
              if (action.jump && wasDown) {
                player.yv = -5.25;
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

          if (!verTestY && player.yv < 9.5) {
            player.yv += 0.15;
          }

          // if (player.xv > 0) {
          //   if (hair) {
          //     hair.style.left = '0';
          //   }
          // }
          // if (player.xv < 0) {
          //   if (hair) {
          //     hair.style.left = '8px';
          //   }
          // }

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
        // player.x = playerData?.x ?? 0;
        // player.y = playerData?.y ?? 0;
        // setPlayerLocation(player.x, player.y);
        // playerModel.style.left = player.x + 'px';
        // playerModel.style.bottom = player.y + 'px';

        //Update view position
        //level.style.left = -1 * (player.x - 115) + 'px';
        //level.style.bottom = (-1 * player.y + 80) + 'px';
        // var xDif =
        //   parseInt(level?.style.left) - (-1 * (player.x - 115));
        // var yDif =
        //   parseInt(level?.style.bottom) - (-1 * (player.y - 80));

        // if (xDif > 10) {
        //   level.style.left = parseInt(level.style.left) - 10 + 'px';
        // } else if (xDif < -10) {
        //   level.style.left = parseInt(level.style.left) + 10 + 'px';
        // } else {
        //   level.style.left = -1 * (player.x - 115) + 'px';
        // }

        // if (yDif > 15) {
        //   level.style.bottom = parseInt(level.style.bottom) - 10 + 'px';
        // } else if (yDif < -15) {
        //   level.style.bottom = parseInt(level.style.bottom) + 10 + 'px';
        // } else {
        //   level.style.bottom = -1 * (player.y - 80) + 'px';
        // }

        if (ctx) {
          ctx.globalCompositeOperation = 'destination-over';
          ctx.clearRect(0, 0, viewWidth, viewHeight);
          ctx.save();

          //player
          ctx.save();
          ctx.translate(player.x, player.y);
          ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
          ctx.fillRect(0, 0, player.w, player.h);
          ctx.restore();

          //ground
          ctx.save();
          platformData.forEach((platform) => {
            ctx.fillStyle = 'rgba(100, 100, 100, 1.0)';
            if (platform.id) {
              ctx.fillText(platform.id, platform.x + 2, platform.y + 8);
            }

            ctx.fillStyle = 'rgba(230, 230, 230, 1.0)';
            ctx.fillRect(
              platform.x,
              platform.y,
              platform.w ?? 0,
              platform.h ?? 0
            );
          });
          ctx.restore();

          //enemies
          ctx.save();
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
          enemyData.forEach((enemy) => {
            ctx.save();
            ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
            ctx.restore();
          });
          ctx.restore();

          ctx.restore();
        }

        //Update death count
        if (deathDisplay) {
          deathDisplay.innerHTML = 'Deaths: ' + deaths;
        }

        fpsSmooth--;
        if (fpsSmooth === 0) {
          newTime = +new Date();
          if (fps) {
            fps.innerHTML =
              'fps: ' + Math.round(1000 / ((newTime - prevTime) / 10));
          }
          prevTime = newTime;
          fpsSmooth = 10;
        }

        //Call next tick cycle
        window.requestAnimationFrame(tick);
      };

      const init = function () {
        player = { ...player, ...playerStart };

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
    }
  });
</script>

<canvas bind:this={canvas} />

<style lang="scss" global>
  @import './jsbob2.scss';
</style>
