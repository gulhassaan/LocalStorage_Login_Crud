function signup(e){
    event.preventDefault();
    console.log("working........")

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var user ={
        email: email,
        username: username,
        password: password
    };

    var json = JSON.stringify(user);
    localStorage.setItem(username, json); // Store using username as the key
    console.log("user's data")
}

function login(e){
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var result = document.getElementById("result");
 
    var user = localStorage.getItem(username);
    
    if(user == null){
        result.innerHTML="Invalid username";
        console.log("Invalid username");
    } else {
        var data = JSON.parse(user);
        console.log(data);
        if (username === data.username && password === data.password){
            result.innerHTML="Logged In Successfully";
            console.log("Logged In Successfully")
            localStorage.setItem("loggedInUser", username); // Store logged-in username
            window.location.href = "index.html";
        } else {
            result.innerHTML="Invalid Password";
            console.log("Invalid Password")
        }
    }
}
