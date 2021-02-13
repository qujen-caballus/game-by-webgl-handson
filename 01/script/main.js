
(() => {
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;

    let util = null;
    let canvas = null;
    let ctx = null;
    let image = null;

    //ページのロードが終わったらイベントを発火させる
    window.addEventListener('load', () => {
        util = new Canvas2DUtility(document.body.querySelector('#main_canvas'));
        canvas = util.canvas;
        ctx = util.context;

        util.imageLoader('./image/robo.png', (loadedImage) => {
            // 引数から画像を受け取り変数に代入
            image = loadedImage;
            // 初期化処理を行う
            initialize();
            // 描画処理を行う
            render();
        });
    }, false);

    //初期化関数
    function initialize(){
        canvas.width = GAME_SCREEN_WIDTH;
        canvas.height = GAME_SCREEN_HEIGHT;
    }

    //描画の関数
    function render(){
        util.drawRect(0, 0, canvas.width, canvas.height, '#eeeeee');
        ctx.drawImage(image, 0, GAME_SCREEN_HEIGHT - 100);
        requestAnimationFrame(render);
    }
})();
