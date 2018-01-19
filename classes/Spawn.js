function Spawn(corner, type, turn) {
    this.r = -100;
    this.corner = corner;
    this.type = type;
    this.turn = turn;
    this.destroyed = false;
    if (type == 2) {
        if (turn == 0) {
            var ticksright = true;
            var ticks = 0;
        }
        else {
            var ticksright = false;
            var ticks = 20;
        }
        this.moveplane = function () {           
            if (ticksright) {
                this.corner += 2;
                ticks++;
            }
            else {
                this.corner -= 2;
                ticks--;
            }
            if (ticks <= 0) {
                this.turn = 0;
                ticksright = true;
            }
            if (ticks >= 60) {
                this.turn = 1;
                ticksright = false;
            }
        }
    }
    else if (type == 3) {
        this.moveplane = function () {

        }
    }
    else {
        var tickslimit = 10 + Math.round(Math.random() * 50);
        if (turn == 0) {
            var ticks = 0;
        }
        else {
            var ticks = tickslimit;
        }
        var startMove = 100 + Math.round(Math.random() * 200);
        this.moveplane = function () {
            if (turn == 0 && startMove<=0 && ticks<=tickslimit) {
                this.corner += 2;
                ticks++;
            }
            else if (turn == 1 && startMove <= 0 && ticks>=0) {
                this.corner -= 2;
                ticks--;
            }
            startMove -= 5;
        }
    }
}