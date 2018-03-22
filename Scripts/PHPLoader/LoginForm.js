class LoginForm {
    constructor() {
        this.create();
    }
    
    create() {
        document.getElementById('login').innerHTML = '<input id="nameInput" type="text" name="user" placeholder="Benutzername"><input type="submit" value="Log-In" onclick="doLogin()">';
    }
    
    delete() {
        document.getElementById("login").innerHTML = "";
    }
}
