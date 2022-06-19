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
    private logBtn:cc.Node=null;
    private signBtn:cc.Node=null;

    onLoad(){
        this.logInWindow=cc.find("Canvas/login_window");
        this.signUpWindow=cc.find("Canvas/signup_window");
        this.logBtn=cc.find("Canvas/loginBtn");
        this.signBtn=cc.find("Canvas/signupBtn");
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
        this.logBtn.active=false;
        this.signBtn.active=false;
        this.logInWindow.active=true;
    }
    signUpBtn(){
        this.logBtn.active=false;
        this.signBtn.active=false;
        this.signUpWindow.active=true;
    }
    closeSignUp(){
        this.logBtn.active=true;
        this.signBtn.active=true;
        this.signUpWindow.active=false;
    }
    closeLogIn(){
        this.logBtn.active=true;
        this.signBtn.active=true;
        this.logInWindow.active=false;
    }
    submitLogIn(){

    }
    submitSingUp(){

    }

}
