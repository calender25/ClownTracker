
class MainView {
    // properties
    private loginButton:HTMLButtonElement = null;
    private userName:HTMLInputElement = null;
    private password:HTMLInputElement = null;
    private registerButton:HTMLButtonElement = null;
    private registerForm: HTMLFormElement = null;
    private static instance: MainView;

    // methods
    constructor(){
        this.loginButton = (document.getElementById("login-form-submit") as HTMLButtonElement);
        this.registerButton = (document.getElementById("register-button") as HTMLButtonElement);
        this.registerForm = (document.getElementById("register-form") as HTMLFormElement);
        this.userName = (document.getElementById("username-field") as HTMLInputElement);
        this.password = (document.getElementById("password-field") as HTMLInputElement);
        this.registerEvents();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new MainView();
        }
        return this.instance;
    }

    private registerEvents():void{
        this.loginButton.removeEventListener("click",this.loginHandler.bind(this))
        this.loginButton.addEventListener("click", this.loginHandler.bind(this));

        this.registerButton.removeEventListener("click",this.registerBtnHandler.bind(this))
        this.registerButton.addEventListener("click", this.registerBtnHandler.bind(this));

        this.registerForm.removeEventListener("submit", this.registerSbtHandler.bind(this));
        this.registerForm.addEventListener("submit", this.registerSbtHandler.bind(this));

    }

    private loginHandler(ev:Event):void{
        const userName:string = this.userName.value;
        const password:string = this.password.value;
        const self:MainView = this;

        function callback(resp:any) {
            if(resp === "success"){
                document.getElementById("login-section").style.display = "none";
                document.getElementById("register-section").style.display = "none";
                document.getElementById("clown-list-header").style.display = "block";
                ClownDataVM.requestDataFromServer();
            } else{
                alert("Login failed");
            }

        }
        const data:any = {'userName':userName, 'password':password};
        HttpRequest.postRequest(data,"login",callback);
        ev.preventDefault();
    }

    private registerBtnHandler():void{
        const form: HTMLElement = document.getElementById("register-form");
        if(form.className === "registerForm-hide"){
            form.className = "registerForm-show";
        }
    }

    private registerSbtHandler(ev:Event):void{
        const form: HTMLElement = document.getElementById("register-form");
        if(form.className === "registerForm-show"){
            form.className = "registerForm-hide";
        }
        const clownData = {
            name:(document.getElementById("name-field") as HTMLInputElement).value,
            dob: (document.getElementById("dob-field") as HTMLInputElement).value,
            address:(document.getElementById("address-field") as HTMLInputElement).value,
            clownType:(document.getElementById("clownType-field") as HTMLInputElement).value,
            email:(document.getElementById("email-field") as HTMLInputElement).value
        }
        function callback(){console.log("registered");};
        HttpRequest.postRequest(clownData,"register",callback);
        alert("Registration submitted, Thank You.");
        ev.preventDefault();
    }

    public static updateClownList(data:IClownData[]):void{
        const listElem: HTMLOListElement = (document.getElementById("clownlist") as HTMLOListElement);
        data.forEach(clown => {
            const entry = document.createElement('li');
            entry.appendChild(document.createTextNode(clown.name));
            listElem.appendChild(entry);
        });
    }
}
