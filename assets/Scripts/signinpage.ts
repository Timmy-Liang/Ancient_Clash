// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class signinpage extends cc.Component {
    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;
    private logInWindow:cc.Node=null;
    private signUpWindow:cc.Node=null;
    onLoad(){
        this.logInWindow=cc.find("Canvas/login_window");
        this.signUpWindow=cc.find("Canvas/signup_window");
    }
    start () {
        this.logInWindow.active=false;
        this.signUpWindow.active=false;
        this.playBGM();
        
    }
    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
    testBtnEvent(){
        cc.director.loadScene("start");
    }
    logInBtn(){

        this.logInWindow.active=true;
    }
    signUpBtn(){
        this.signUpWindow.active=true;
    }
    closeSignUp(){
        this.signUpWindow.active=false;
    }
    closeLogIn(){
        this.logInWindow.active=false;
    }
    submitLogIn(){

    }
    submitSingUp(){

    }

}
