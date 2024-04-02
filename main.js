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
        Swal.fire({
            title: 'Failed!',
            text: 'Invalid username',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          
    } else {
        var data = JSON.parse(user);
        console.log(data);
        if (username === data.username && password === data.password){
            result.innerHTML="Logged In Successfully";
          
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will be logged in.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const username = "username"; // Assuming you have the username variable defined
                        localStorage.setItem("loggedInUser", username); // Store logged-in username
                        Swal.fire({
                            title: 'Success!',
                            text: 'Logged In Successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.href = "index.html";
                        });
                    }
                });
                    
        } else {
            result.innerHTML="Invalid Password";
            console.log("Invalid Password")
            Swal.fire({
                title: 'Failed!',
                text: 'Invalid Password',
                icon: 'error',
                confirmButtonText: 'OK'
              });
        }
    }
}
