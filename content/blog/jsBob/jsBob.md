---
title: jsBob
date: '2023-08-30'
category: 'Coding'
tags:
  - game
  - webdev
description: A simple game I made using javascript when I should have being paying attention in a Java course. Atwood's Law eh.
image: jsbob
draft: true
---

A simple game I made using javascript when I should have being paying attention in a Java course. Atwood's Law eh. It is crude and old but has some charm?

The entire game runs on the dom so in theory this could be inject onto any site with a bit of tweaking.

<div id="jsBob">
  <div id="view">
    <div id="level" bind:this={level}>
      <div id="player" bind:this={playerModel}>
        <div id="head"><div id="hair" /></div>
        <div id="body" />
        <div id="leg" />
      </div>
      <div bind:this={enemies} />
      <div
        id="plat1"
        class="obstacle platform"
        style="left: 80px; bottom: 80px;"
      >
        plat1
      </div>
      <div id="wall1" class="obstacle wall" style="left: 0px; bottom: 0px;">
        wall1
      </div>
      <div id="wall2" class="obstacle wall" style="right: 0px; bottom: 0px;">
        wall2
      </div>
      <div
        id="block"
        class="obstacle block"
        style="width:40px; height:70px; left:180px; bottom:20px;"
      >
        block
      </div>
      <div
        id="block2"
        class="obstacle block"
        style="width:40px; height:70px; left:230px; bottom:90px;"
      >
        block2
      </div>
      <div
        id="plat2"
        class="obstacle platform"
        style="left: 220px; bottom: 130px;"
      >
        plat2
      </div>
      <div
        id="block3"
        class="obstacle block"
        style="width:25px; height:10px; left:450px; bottom:220px;"
      >
        block3
      </div>
      <div
        id="ground"
        class="obstacle ground"
        style="width:100%; height:20px; bottom:0px;"
      >
        ground
      </div>
      <div
        id="block4"
        class="obstacle wall"
        style="width:10px; height:95px; left:20px; bottom:20px;"
      />

      <div
        class="obstacle platform"
        style="height:10px; width:50px; left:80px; bottom:190px;"
      />

      <span id="help1Show" class="speach">WASD to move!</span>
    </div>

    <div id="deathCount" />
    <div id="fpsCount" />

  </div>
</div>
