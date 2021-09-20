//get form and inputs
const form = document.getElementById('form-login')
const user = document.getElementById('user');
const password = document.getElementById('password');

//action click on the login button
form.addEventListener('submit', function (event) {
    //credential validation
    if(user == 'admin' && password == '1234'){
        //administration page access
        window.location.href="dashboard.html"; 
    }
});