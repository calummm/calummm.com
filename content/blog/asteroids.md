---
title: Asteroids
subtitle:
started: 2024-02-16
date: 2024-02-17
category: Coding
visible: true
tags:
  - game
  - webdev
description: A make of asteroids in javascript
image: asteroids
---

A canvas based adaptation of the classic Asteroids

<canvas id="asteroids-canvas" tabindex="0" />

<script>

  let canvas = document.getElementById('asteroids-canvas');
  const viewWidth = 500;
  const viewHeight = 500;
  const levelWidth = 500;
  const levelHeight = 500;

  const player = {
    x: levelWidth / 2,
    y: levelHeight / 2,
    rot: 0,
    xv: 0,
    yv: 0,
    timeToReload: 0,
    timeToRespawn: 0,
  };

  const power = 0.05;
  const respawnTime = 60 * 3;
  let timeDead = 0;
  const clampV = 5;

  const action = {
    right: false,
    thrust: false,
    left: false,
    shoot: false,
  };

  const key = {
    ArrowRight: 'right',
    ArrowUp: 'thrust',
    ArrowLeft: 'left',
    ' ': 'shoot',
  };

  let bullets = [];

  const rockSize = [10, 20, 30, 40];
  const rockShape = [];
  // rockShape.push(new Path2D());

  let rocks = [];

  const createRock = (size, speed = 2) => ({
    x: Math.random() * levelWidth,
    y: Math.random() * levelHeight,
    rot: Math.random() * 360,
    rotV: Math.random() * 10,
    size,
    xv: -speed + Math.random() * speed * 2,
    yv: -speed + Math.random() * speed * 2,
  });

  let currentLevel = 1;

  const createLevel = (numberOfRocks) => {
    for (let i = 0; i < numberOfRocks; i++) {
      rocks.push(createRock(rockSize.length - 1));
    }
  };

  createLevel(2);

  const clampToScreen = (obj, gutter = 5) => {
    if (obj.x > levelWidth + gutter) {
      obj.x = 0 - gutter;
    } else if (obj.x < 0 - gutter) {
      obj.x = levelWidth + gutter;
    }

    if (obj.y > levelHeight + gutter) {
      obj.y = 0 - gutter;
    } else if (obj.y < 0 - gutter) {
      obj.y = levelHeight + gutter;
    }
  };

  const distanceBetweenObj = (obj1, obj2) =>
    Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));


      canvas.height = viewHeight;
      canvas.width = viewWidth;
      canvas.focus();

      const ctx = canvas.getContext('2d', { alpha: true });

      const init = () => {
        canvas.addEventListener('keydown', function (evt) {
          evt.preventDefault();
          if (key.hasOwnProperty(evt.key)) {
            action[key[evt.key]] = true;
          }
        });
        canvas.addEventListener('keyup', function (evt) {
          if (key.hasOwnProperty(evt.key)) {
            action[key[evt.key]] = false;
          }
        });

        tick();
      };

      const tick = () => {
        if (ctx) {
          // Logic
          if (player.timeToRespawn) {
            player.timeToRespawn -= 1;

            if (player.timeToRespawn === 0) {
              player.x = levelWidth / 2;
              player.y = levelHeight / 2;
              player.rot = 0;
              player.xv = 0;
              player.yv = 0;
            }
          } else {
            if (action.left && !action.right) {
              player.rot -= 3;
            } else if (!action.left && action.right) {
              player.rot += 3;
            }

            const pRad = (player.rot * Math.PI) / 180;

            if (action.thrust) {
              player.yv -= power * Math.cos(pRad);
              player.xv += power * Math.sin(pRad);
            }

            if (player.timeToReload) {
              player.timeToReload -= 1;
            }
            if (action.shoot && player.timeToReload === 0) {
              const bullet = {
                x: player.x,
                y: player.y,
                xv: player.xv + 10 * Math.sin(pRad),
                yv: player.yv + 10 * -Math.cos(pRad),
                rot: player.rot,
                timeToLive: 60 * 1.2,
              };
              bullets.push(bullet);
              player.timeToReload = 60 * 0.3;
            }
          }

          if (player.yv > clampV) {
            player.yv = clampV;
          } else if (player.yv < -clampV) {
            player.yv = -clampV;
          }
          if (player.xv > clampV) {
            player.xv = clampV;
          } else if (player.xv < -clampV) {
            player.xv = -clampV;
          }

          player.x += player.xv;
          player.y += player.yv;

          clampToScreen(player);

          bullets = bullets.filter((bullet) => {
            bullet.timeToLive -= 1;
            bullet.y += bullet.yv;
            bullet.x += bullet.xv;
            clampToScreen(bullet);
            return bullet.timeToLive > 0;
          });

          rocks.forEach((rock) => {
            rock.rot += rock.rotV;
            rock.x += rock.xv;
            rock.y += rock.yv;
            clampToScreen(rock);

            const collideWithBullet = bullets.find(
              (bullet) => distanceBetweenObj(rock, bullet) < rockSize[rock.size]
            );

            if (collideWithBullet) {
              rock.size -= 1;
              const speed = 2;
              rock.xv = -speed + Math.random() * speed * 2;
              rock.yv = -speed + Math.random() * speed * 2;
              const rockB = {
                ...rock,
                xv: -speed + Math.random() * speed * 2,
                yv: -speed + Math.random() * speed * 2,
              };
              rocks.push(rockB);

              collideWithBullet.timeToLive = 0;
            }

            const collideWithPlayer =
              player.timeToRespawn === 0 &&
              distanceBetweenObj(player, rock) < rockSize[rock.size] + 15;

            if (collideWithPlayer) {
              player.timeToRespawn = respawnTime;
              timeDead = 0;
            }
          });

          rocks = rocks.filter((rock) => rock.size >= 0);

          if (rocks.length <= 0) {
            currentLevel += 1;
            createLevel(2 + currentLevel);
          }

          // Draw
          ctx.globalCompositeOperation = 'destination-over';
          ctx.clearRect(0, 0, viewWidth, viewHeight);
          ctx.save();

          // Draw Player
          ctx.save();
          ctx.translate(player.x, player.y);
          ctx.rotate((player.rot * Math.PI) / 180);
          ctx.beginPath();
          ctx.strokeStyle = 'white';

          const deathAnimation = (rot = 0.01) => {
            if (player.timeToRespawn) {
              ctx.translate(rot * timeDead, rot * timeDead);
              timeDead++;
            }
          };
          deathAnimation();
          ctx.moveTo(+10, +15);
          deathAnimation();
          ctx.lineTo(-0, -15);
          deathAnimation();
          ctx.lineTo(-10, +15);
          deathAnimation();
          ctx.moveTo(+8, +10);
          deathAnimation();
          ctx.lineTo(-8, +10);

          // Draw Player engine
          if (action.thrust && player.timeToRespawn === 0) {
            ctx.moveTo(+5, +10);
            ctx.lineTo(0, +18);
            ctx.lineTo(-5, +10);
            // ctx.stroke();
          }
          ctx.stroke();

          ctx.restore();

          // Draw bullets
          bullets.forEach((bullet) => {
            ctx.save();
            // ctx.translate(bullet.x, bullet.y);
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.arc(bullet.x, bullet.y, 3, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
          });

          // Draw rocks
          rocks.forEach((rock) => {
            ctx.save();
            ctx.translate(rock.x, rock.y);
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.arc(0, 0, rockSize[rock.size], 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
          });

          ctx.restore();
        }

        window.requestAnimationFrame(tick);
      };

      init();

</script>
