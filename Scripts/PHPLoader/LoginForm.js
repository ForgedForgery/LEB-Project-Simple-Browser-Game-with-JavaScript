class LoginForm {
    constructor() {
        this.create();
    }
    
    create() {
        document.getElementById('login').innerHTML = '<input id="nameInput" type="text" name="user" placeholder="Benutzername"><input id="passInput" type="password" name="pass" placeholder="Passwort"><input type="submit" value="Log-In" onclick="doLogin()">';
    }
    
    delete() {
        document.getElementById("login").innerHTML = "";
    }
}