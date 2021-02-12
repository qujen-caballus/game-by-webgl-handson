//Sceneのセッティング
class SceneManager {
    constructor(){
        this.scene = {};
        this.activeScene = null;
        this.startTime = null;
        this.frame = null;
    }
//シーンの追加
    add(name, updateFunction){
        this.scene[name] = updateFunction;
    }
//シーンを使う
    use(name){
        if(this.scene.hasOwnProperty(name) !== true){
            return;
        }
        this.activeScene  = this.scene[name];
        this.startTime = Date.now();
        this.frame = -1;
    }
//シーンの更新
    update(){
        let activeTime = (Date.now() - this.startTime) / 1000;
        this.activeScene(activeTime);
        ++this.frame
    }
}