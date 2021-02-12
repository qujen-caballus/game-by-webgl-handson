
(() => {
    window.isKeyDown = {};
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;
    const ITEM_MAX_COUNT = 15;

    let util = null;
    let canvas = null;
    let ctx = null;
    let item = null;
    let scene = null;
    let startTime = null;
    let hero = null;
    let itemArray = [];
    

    window.addEventListener('load', () => {
        util = new Canvas2DUtility(document.body.querySelector('#main_canvas'));
        canvas = util.canvas;
        ctx = util.context;

       
        initialize();
        loadCheck();
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

        scene = new SceneManager();
        hero = new Hero(ctx, 0, 0,64, 64, './image/robo.png');
        hero.setStart(
            -100,
            GAME_SCREEN_HEIGHT-100,
            50,
            GAME_SCREEN_HEIGHT-100
        )
        for(let i = 0; i< ITEM_MAX_COUNT; ++i){
            itemArray[i] = new Item(ctx, 0, 0, 28, 28, './image/item.png');
        }
        for(let i = 0; i < ITEM_MAX_COUNT; ++i){

            itemArray[i].setTarget(hero);
        }

    }

    function loadCheck(){
        let ready = true;
        ready = ready && hero.ready;

        itemArray.map((v) => {
            ready = ready && v.ready;
        });
        //全ての準備が完了したら処理を開始する
        if(ready === true){
            eventSetting();
            sceneSetting();
            startTime = Date.now();
            render();
        }else{
            //それ以外の場合は再帰呼び出しを100ms毎に行う
            setTimeout(loadCheck, 100);
        }
    }

    //シーンのセッティング
    function sceneSetting(){
        //最初の2秒間はオープニング
        scene.add('opening',(time) =>{
            if(time > 2.0){
                scene.use('playing')
            }
        });
        //連続処理
        scene.add('playing', (time) => {

            if (scene.frame === 0) {
                for (let i = 0; i < ITEM_MAX_COUNT; ++i) {
                    if (itemArray[i].life <= 0) {
                        let ia = itemArray[i];
                        ia.set(randomizeDomainInt(GAME_SCREEN_WIDTH), -ia.height, 1, 'default');
                        break;
                    }
                }
            }
            if(scene.frame === 50){
                scene.use('playing');
            }
        });
        scene.use('opening');
    }

    //描画処理関数
    function render(){
        ctx.globalAlpha = 1.0;
        util.drawRect(0, 0, canvas.width, canvas.height, '#eeeeee');
        util.drawRect(0, hero.position.y + 32, canvas.width, canvas.height - hero.position.y, '#333333');

        scene.update();
        hero.update();
        itemArray.map((v) => {
            v.update();
        })
        requestAnimationFrame(render);
    }

    function randomizeDomainInt(domain){
        let random = Math.random();
        return Math.floor(random * domain);
    }
})();
