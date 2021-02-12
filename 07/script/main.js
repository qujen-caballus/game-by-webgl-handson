
(() => {
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;

    let util = null;
    let canvas = null;
    let ctx = null;
    let image = null;
    let startTime = null;
    let hero = null;
    window.isKeyDown = {};

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
            isKeyDown[`key_${event.key}`] = true;
            }, false);
        
        window.addEventListener('keyup', (event) => {
            isKeyDown[`key_${event.key}`] = false;
            }, false);
    }

    //初期化関数
    function initialize(){

        // canvas の大きさを設定
        canvas.width = GAME_SCREEN_WIDTH;
        canvas.height = GAME_SCREEN_HEIGHT;

        hero = new Hero(ctx, 0, 0,64, 64, image);
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
        util.drawRect(0, hero.position.y + 32, canvas.width, canvas.height - hero.position.y, '#333333');
       
        hero.update();
        requestAnimationFrame(render);
    }
})();
