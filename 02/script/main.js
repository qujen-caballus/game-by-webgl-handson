
(() => {
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;

    let util = null;
    let canvas = null;
    let ctx = null;
    let image = null;
    let startTime = null;

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

            startTime = Date.now();
            // 描画処理を行う
            render();
        });
    }, false);

//初期化関数
    function initialize(){
        canvas.width = GAME_SCREEN_WIDTH;
        canvas.height = GAME_SCREEN_HEIGHT;
    }

    //描画関数
    function render(){
        util.drawRect(0, 0, canvas.width, canvas.height, '#eeeeee');
        let nowTime = (Date.now() - startTime) / 1000;
        let sin = Math.sin(nowTime);
        let x = sin * 100.0
        // 画像を描画する
        ctx.drawImage(image, GAME_SCREEN_WIDTH / 2 + x, GAME_SCREEN_HEIGHT - 100);
        requestAnimationFrame(render);
    }
})();
