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
    private signEmailBox:cc.Node=null;
    private logEmailBox:cc.Node=null;
    private signPassBox:cc.Node=null;
    private logPassBox:cc.Node=null;

    private player1Box:cc.Node=null;
    private player2Box:cc.Node=null;
    private player3Box:cc.Node=null;
    private player4Box:cc.Node=null;
    onLoad(){
        this.logInWindow=cc.find("Canvas/login_window");
        this.signUpWindow=cc.find("Canvas/signup_window");
        this.logBtn=cc.find("Canvas/loginBtn");
        this.signBtn=cc.find("Canvas/signupBtn");
        this.signEmailBox=cc.find("Canvas/signup_window/email/email_EditBox");
        this.signPassBox=cc.find("Canvas/signup_window/pass/pass_EditBox");
        this.logEmailBox=cc.find("Canvas/login_window/email/email_EditBox");
        this.logPassBox=cc.find("Canvas/login_window/pass/pass_EditBox");

        this.player1Box=cc.find("Canvas/signup_window/playersname/p1name/name");
        this.player2Box=cc.find("Canvas/signup_window/playersname/p2name/name");
        this.player3Box=cc.find("Canvas/signup_window/playersname/p3name/name");
        this.player4Box=cc.find("Canvas/signup_window/playersname/p4name/name");
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
        let email = this.logEmailBox.getComponent(cc.EditBox).textLabel.string;
        let password=this.logPassBox.getComponent(cc.EditBox).textLabel.string;
        cc.log(email+"\n"+password);
        
        
            firebase.auth().signInWithEmailAndPassword(email, password).then((r) => {
                alert("login success");
                
                cc.director.loadScene("start");
    
            }).catch(e => console.log("eEEError"));
        
        
        
       
    }
    submitSingUp(){
        
        
        let email = this.signEmailBox.getComponent(cc.EditBox).textLabel.string;
        let password=this.signPassBox.getComponent(cc.EditBox).textLabel.string;
        console.log(email+"\n"+password);
        if(this.player1Box.getComponent(cc.EditBox).textLabel.string=="" ||
        this.player2Box.getComponent(cc.EditBox).textLabel.string==""||
        this.player3Box.getComponent(cc.EditBox).textLabel.string==""||
        this.player4Box.getComponent(cc.EditBox).textLabel.string==""
        ){
            alert("please type in the player's name");
        }else{
            let user1={
                name:this.player1Box.getComponent(cc.EditBox).textLabel.string,
                wincount:0,
                totalcount:0
            };
            let user2={
                name:this.player2Box.getComponent(cc.EditBox).textLabel.string,
                wincount:0,
                totalcount:0
            };
            let user3={
                name:this.player3Box.getComponent(cc.EditBox).textLabel.string,
                wincount:0,
                totalcount:0
            };
            let user4={
                name:this.player4Box.getComponent(cc.EditBox).textLabel.string,
                wincount:0,
                totalcount:0
            };
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((usercre) => {
                
                alert("sign up success");
                let ref = firebase.database().ref("account_data/" + usercre.user.uid);
                let userdata={
                    user1:user1,
                    user2:user2,
                    user3:user3,
                    user4:user4
                }
                ref.set({
                    uid: usercre.user.uid,
                    email: email,
                    userdata:userdata
                });
                //this.props.usHand();

            })
            .catch(e => {
                console.log(e.message);
            });
        }
        
    }

}
