
(() => {
    window.isKeyDown = {};
    const GAME_SCREEN_WIDTH = 640;
    const GAME_SCREEN_HEIGHT = 480;
    const ITEM_MAX_COUNT = 15;
    const KILLING_ITEM_MAX_COUNT = 5;

    let util = null;
    let canvas = null;
    let ctx = null;
    let scene = null;
    let startTime = null;
    let hero = null;
    let itemArray = [];
    let killingItemArray = [];
    let restart = false; 
    

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
            if (event.key === 'Enter'){
                if(hero.life <= 0){
                    restart = true;
                }
            }
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

        for(let i = 0; i< KILLING_ITEM_MAX_COUNT; ++i){
            killingItemArray[i] = new Item(ctx, 0, 0, 32, 32, './image/killing_item.png');
        }

        for(let i = 0; i < ITEM_MAX_COUNT; ++i){

            itemArray[i].setTarget(hero);
        }
        for(let i = 0; i < KILLING_ITEM_MAX_COUNT; ++i)
        {
            killingItemArray[i].setTarget(hero);
        }

    }

    function loadCheck(){
        let ready = true;
        ready = ready && hero.ready;

        itemArray.map((v) => {
            ready = ready && v.ready;
        });
        killingItemArray.map((v) =>{
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
            else if(scene.frame == 5){
                for (let i = 0; i < KILLING_ITEM_MAX_COUNT; ++i) {
                    if (killingItemArray[i].life <= 0) {
                        let ka = killingItemArray[i];
                        ka.set(randomizeDomainInt(GAME_SCREEN_WIDTH), -ka.height, 2, 'default');
                        break;
                    }
                }
            }
            if(scene.frame === 50){
                scene.use('playing');
            }
            if(hero.life <= 0){
                scene.use('gameover');
            }
            

        });

        scene.add('gameover', (time) => {
            let textWidth = GAME_SCREEN_WIDTH / 2;
            let loopWidth = GAME_SCREEN_WIDTH + textWidth;
            let x = GAME_SCREEN_WIDTH - (scene.frame * 2) % loopWidth;
            ctx.font = 'bold 50px sans-serif';
            util.drawText('GAME OVER', x, GAME_SCREEN_HEIGHT / 2, '#ff0000', textWidth);
            ctx.font = 'bold 20px sans-serif';
            util.drawText('Press Enter', x + 110, GAME_SCREEN_HEIGHT / 2 + 30, '#ff0000', textWidth);
            if(restart === true){
                restart = false;
                hero.setStart(
                    -100,
            GAME_SCREEN_HEIGHT-100,
            50,
            GAME_SCREEN_HEIGHT-100
                );
                scene.use('opening');
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
        killingItemArray.map((v) => {
            v.update();
        })
    }

    function randomizeDomainInt(domain){
        let random = Math.random();
        return Math.floor(random * domain);
    }
})();
