
(() => {
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;

    let util = null;
    let canvas = null;
    let ctx = null;
    let image = null;
    let startTIme = null;
    let heroX = GAME_SCREEN_WIDTH / 2;
    let heroY = GAME_SCREEN_HEIGHT/ 2;

    window.addEventListener('load', () => {
        util = new Canvas2DUtility(document.body.querySelector('#main_canvas'));
        canvas = util.canvas;
        ctx = util.context;

        // まず最初に画像の読み込みを開始する
        util.imageLoader('./image/robo.png', (loadedImage) => {
            // 引数から画像を受け取り変数に代入
            image = loadedImage;
            //初期化処理を行う
            initialize();
            // キー入力を受け取る
            eventSetting();
            startTime = Date.now();
            //描画処理を行う
            render();
        });
    }, false);

    function eventSetting(){
        window.addEventListener('keydown', (event) => {
            switch(event.key){
                case 'a':  
                    heroX -= 10;
                    break;
                case 'd':
                    heroX += 10;
                    break;
            }
        }, false);
    }

    function initialize(){
        canvas.width = GAME_SCREEN_WIDTH;
        canvas.height = GAME_SCREEN_HEIGHT;
    }

    function render(){
        util.drawRect(0, 0, canvas.width, canvas.height, '#eeeeee');
        ctx.drawImage(image, heroX, GAME_SCREEN_HEIGHT - 100);
        requestAnimationFrame(render);
    }
})();
