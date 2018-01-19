function Bullet(ctx, playerY) {
    this.y = playerY;
    this.chgBltPos=function(){
        this.y -= 15;
    }
}