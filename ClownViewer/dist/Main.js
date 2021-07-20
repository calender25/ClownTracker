class MainView {
    // methods
    constructor() {
        // properties
        this.loginButton = null;
        this.userName = null;
        this.password = null;
        this.registerButton = null;
        this.registerForm = null;
        this.loginButton = document.getElementById("login-form-submit");
        this.registerButton = document.getElementById("register-button");
        this.registerForm = document.getElementById("register-form");
        this.userName = document.getElementById("username-field");
        this.password = document.getElementById("password-field");
        this.registerEvents();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new MainView();
        }
        return this.instance;
    }
    registerEvents() {
        this.loginButton.removeEventListener("click", this.loginHandler.bind(this));
        this.loginButton.addEventListener("click", this.loginHandler.bind(this));
        this.registerButton.removeEventListener("click", this.registerBtnHandler.bind(this));
        this.registerButton.addEventListener("click", this.registerBtnHandler.bind(this));
        this.registerForm.removeEventListener("submit", this.registerSbtHandler.bind(this));
        this.registerForm.addEventListener("submit", this.registerSbtHandler.bind(this));
    }
    loginHandler(ev) {
        const userName = this.userName.value;
        const password = this.password.value;
        const self = this;
        function callback(resp) {
            if (resp === "success") {
                document.getElementById("login-section").style.display = "none";
                document.getElementById("register-section").style.display = "none";
                document.getElementById("clown-list-header").style.display = "block";
                ClownDataVM.requestDataFromServer();
            }
            else {
                alert("Login failed");
            }
        }
        const data = { 'userName': userName, 'password': password };
        HttpRequest.postRequest(data, "login", callback);
        ev.preventDefault();
    }
    registerBtnHandler() {
        const form = document.getElementById("register-form");
        if (form.className === "registerForm-hide") {
            form.className = "registerForm-show";
        }
    }
    registerSbtHandler(ev) {
        const form = document.getElementById("register-form");
        if (form.className === "registerForm-show") {
            form.className = "registerForm-hide";
        }
        const clownData = {
            name: document.getElementById("name-field").value,
            dob: document.getElementById("dob-field").value,
            address: document.getElementById("address-field").value,
            clownType: document.getElementById("clownType-field").value,
            email: document.getElementById("email-field").value
        };
        function callback() { console.log("registered"); }
        ;
        HttpRequest.postRequest(clownData, "register", callback);
        alert("Registration submitted, Thank You.");
        ev.preventDefault();
    }
    static updateClownList(data) {
        const listElem = document.getElementById("clownlist");
        data.forEach(clown => {
            const entry = document.createElement('li');
            entry.appendChild(document.createTextNode(clown.name));
            listElem.appendChild(entry);
        });
    }
}
//# sourceMappingURL=Main.js.map