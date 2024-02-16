<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  const viewWidth = 500;
  const viewHeight = 500;
  const levelWidth = 500;
  const levelHeight = 500;

  interface Obj {
    x: number;
    y: number;
    rot: number;
    xv: number;
    yv: number;
  }

  interface Player extends Obj {
    timeToReload: number;
    timeToRespawn: number;
  }

  const player: Player = {
    x: 250,
    y: 250,
    rot: 0,
    xv: 0,
    yv: 0,
    timeToReload: 0,
    timeToRespawn: 0,
  };

  const power = 0.05;
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

  interface Bullet extends Obj {
    timeToLive: number;
  }
  let bullets: Bullet[] = [];

  onMount(() => {
    if (browser) {
      canvas.height = viewHeight;
      canvas.width = viewWidth;

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

      const clampToScreen = (obj: Obj) => {
        if (obj.x > levelWidth) {
          obj.x = 0;
        } else if (obj.x < 0) {
          obj.x = levelWidth;
        }

        if (obj.y > levelHeight) {
          obj.y = 0;
        } else if (obj.y < 0) {
          obj.y = levelHeight;
        }
      };

      const tick = () => {
        if (ctx) {
          // Logic
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

          if (player.timeToReload) {
            player.timeToReload -= 1;
          }
          if (action.shoot && player.timeToReload === 0) {
            const bullet: Bullet = {
              x: player.x,
              y: player.y,
              xv: player.xv + 10 * Math.sin(pRad),
              yv: player.yv + 10 * -Math.cos(pRad),
              rot: player.rot,
              timeToLive: 60 * 1.2,
            };
            bullets.push(bullet);
            player.timeToReload = 60 * 0.5;
          }

          bullets = bullets.filter((bullet) => {
            bullet.timeToLive -= 1;
            bullet.y += bullet.yv;
            bullet.x += bullet.xv;
            clampToScreen(bullet);
            return bullet.timeToLive;
          });

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
          ctx.moveTo(+10, +15);

          ctx.lineTo(-0, -15);
          ctx.lineTo(-10, +15);

          ctx.moveTo(+8, +10);
          ctx.lineTo(-8, +10);

          // Draw Player engine
          if (action.thrust) {
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

          ctx.restore();
        }

        window.requestAnimationFrame(tick);
      };

      init();
    }
  });
</script>

<canvas bind:this={canvas} tabindex="0" />
