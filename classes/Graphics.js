function Graphics() {
/*
0 - boat
    0 - right
    1- left
1 - heli
    0 - right
    1 - left
2 - enemyplane
    0 - right
    1 - left
3 - fuel
    0 - fuel
    1 - fuel
4 - plane
    0 - normal
    1 - right
    2 - left
5 - map
6 - particles
7 - bullet
*/
    this.graphs = [];
    var image = new Image();
    for (var i = 0; i < 5; i++) {
        this.graphs.push(new Array());
    }
    //--------BOAT---------------
    image.src = "gfx/boat_faceright.png";
    this.graphs[0].push(image);
    image = new Image();
    image.src = "gfx/boat_faceleft.png";
    this.graphs[0].push(image);
    //--------HELI---------------
    image = new Image();
    image.src = "gfx/heli_faceright.png";
    this.graphs[1].push(image);
    image = new Image();
    image.src = "gfx/heli_faceleft.png";
    this.graphs[1].push(image);
    //--------ENEMY PLANE--------
    image = new Image();
    image.src = "gfx/enemyplane_faceright.png";
    this.graphs[2].push(image);
    image = new Image();
    image.src = "gfx/enemyplane_faceleft.png";
    this.graphs[2].push(image);    
    //--------FUEL---------------
    image = new Image();
    image.src = "gfx/fuel.png";
    this.graphs[3].push(image);
    this.graphs[3].push(image);
    //--------PLANE--------------
    image = new Image();
    image.src = "gfx/plane.png";
    this.graphs[4].push(image);
    image = new Image();
    image.src = "gfx/plane_turnright.png";
    this.graphs[4].push(image);
    image = new Image();
    image.src = "gfx/plane_turnleft.png";
    this.graphs[4].push(image);
    //--------MAP----------------
    image = new Image();
    image.src = "gfx/riverraidmap.png";
    this.graphs.push(image);
    //--------PARTICLES----------
    image = new Image();
    image.src = "gfx/particles.png";
    this.graphs.push(image);
    //--------BULLET-------------
    image = new Image();
    image.src = "gfx/bullet.png";
    this.graphs.push(image);
}


