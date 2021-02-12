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
    constructor(ctx, x, y, w, h, life, imagePath){
        this.ctx = ctx;
        this.position = new Position(x, y);
        this.width = w;
        this.height = h;
        this.life = life;
        this.ready = false;
        this.image = new Image();
        this.image.addEventListener('load',() =>{
            this.ready = true;
        },false);
        this.image.src = imagePath;
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
    constructor(ctx, x, y, w, h, imagePath){
        super(ctx, x, y, w, h, 0, imagePath);

        this.isStart = false;
        this.speed = 4;
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
        }else{
            if(window.isKeyDown.key_a === true){
                this.position.x -= this.speed;
               
            }
            if(window.isKeyDown.key_d === true){
                this.position.x += this.speed;
            }

            //画面の外に出ないようにする
            let screenWidth = this.ctx.canvas.width;
            let dx = Math.min(Math.max(this.position.x, this.width/ 2),(screenWidth - this.width / 2));
            this.position.set(dx, this.position.y);
        }
        this.draw();

        this.ctx.globalAlpha = 1.0;
    }
}

class Item extends Character {
    constructor(ctx, x, y, w, h, imagePath) {
        super(ctx, x, y, w, h, 0, imagePath);

        this.speed = 3;
    }

    set(x, y){
        this.position.set(x, y);
        this.life = 1;
    }
    update(){
        if(this.life <= 0){return ;}
        this.position.y += this.speed;

        this.draw();
    }
}

