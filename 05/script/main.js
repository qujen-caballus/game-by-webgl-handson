
(() => {
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;

    let util = null;
    let canvas = null;
    let ctx = null;
    let image = null;
    let startTIme = null;
    let hero = null;


    window.addEventListener('load', () => {
        util = new Canvas2DUtility(document.body.querySelector('#main_canvas'));
        canvas = util.canvas;
        ctx = util.context;

        // まず最初に画像の読み込みを開始する
        util.imageLoader('./image/robo.png', (loadedImage) => {
            // 引数から画像を受け取り変数に代入
            image = loadedImage;
            // 初期化処理を行う
            initialize();
            eventSetting();

            startTime = Date.now();
            // 描画処理を行う
            render();
        });
    }, false);

    function eventSetting(){
        window.addEventListener('keydown', (event) => {
            switch(event.key){
                case 'a': // aキー
                    hero.position.x -= 10;
                    break;
                case 'd': // dキー
                    hero.position.x += 10;
                    break;
            }
        }, false);
    }

    //初期化関数
    function initialize(){

        // canvas の大きさを設定
        canvas.width = GAME_SCREEN_WIDTH;
        canvas.height = GAME_SCREEN_HEIGHT;

        hero = new Hero(ctx, 0, 0, image);
        hero.setStart(
            -100,
            GAME_SCREEN_HEIGHT-100,
            50,
            GAME_SCREEN_HEIGHT-100
        )
    }

    //描画処理関数
    function render(){
        ctx.globalAlpha = 1.0;
        util.drawRect(0, 0, canvas.width, canvas.height, '#eeeeee');

        //スタートシーンの記述
        let nowTime = (Date.now() - startTIme) / 1000;
        if(hero.isStart === true){
            let justTiem = Date.now();
            let startTime = (justTiem - hero.comingStart) / 1000;
            //xは登場中増え続ける
            let x = startTime * 50;
            // 一定の位置まで行ったら登場シーンを終える
            if(x >= hero.comingEndPosition.x){
                hero.isStart = false;
                //行き過ぎの可能性があるので再設定
                x = hero.comingEndPosition.x;
            }
            //求めたx座標を設定
            hero.position.set(x, hero.position.y);
        }
        hero.draw();
        requestAnimationFrame(render);
    }
})();
