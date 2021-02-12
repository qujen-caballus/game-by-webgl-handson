//Positonクラス
class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    set(x, y){
        if(x != null){this.x = x;}
        if(y != null){this.y = y;}
    }
}


//Characterクラス、登場するオブジェクトはこれを継承する
class Character{
    constructor(ctx, x, y, isDead, image){
        this.ctx = ctx;
        this.position = new Position(x, y);
        this.isDead = isDead;
        this.image = image;
    }

    draw(){
        this.ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y
        );
    }
}

//主人公のクラス
class Hero extends Character{
    constructor(ctx, x, y, image){
        super(ctx, x, y, 0, image);

        this.isStart = false;
        this.comingStart = null;
        this.comingEndPosition = null;
    }

    setStart(startX, startY, endX, endY){
        this.isStart = true;
        this.comingStart = Date.now();
        this.position.set(startX, startY);
        this.comingEndPosition = new Position(endX,endY);
    }
}