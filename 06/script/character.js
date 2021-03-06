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
    constructor(ctx, x, y, w, h, life, image){
        this.ctx = ctx;
        this.position = new Position(x, y);
        this.width = w;
        this.height = h;
        this.life = life;
        this.image = image;
    }

    draw(){
        let offsetX = this.width / 2;
        let offsetY = this.height / 2;

        this.ctx.drawImage(
            this.image,
            this.position.x - offsetX,
            this.position.y - offsetY,
            this.width,
            this.height
        );
    }
}

//主人公のクラス
class Hero extends Character{
    constructor(ctx, x, y, w, h, image){
        super(ctx, x, y, w, h, 0, image);

        this.isStart = false;
        this.comingStart = null;
        this.comingStartPosition = null;
        this.comingEndPosition = null;
    }

    setStart(startX, startY, endX, endY){
        this.isStart = true;
        this.comingStart = Date.now();
        this.position.set(startX, startY);
        this.comingStartPosition = new Position(startX, startY);
        this.comingEndPosition = new Position(endX,endY);
    }

    update(){
        let justTiem = Date.now();

         if(this.isStart === true){
            let startTime = (justTiem - this.comingStart) / 1000;
            //xは登場中増え続ける
            let x = startTime * 50;
            // 一定の位置まで行ったら登場シーンを終える
            if(x >= this.comingEndPosition.x){
                this.isStart = false;
                //行き過ぎの可能性があるので再設定
                x = this.comingEndPosition.x;
            }
            //求めたx座標を設定
            this.position.set(x, this.position.y);
        }
        this.draw();
    }

}