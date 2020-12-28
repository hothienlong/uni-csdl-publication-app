// const validateRegisterUser = require("../routes/validator");

const authenticationPanel = $('#authentication-panel');
const authenticationForm = $('#authentication-form');
const signupBtn = $('#sign-up');
const signinBtn = $('#sign-in');
const userNameInput = $('#username');
const passwordInput = $('#password');
const signupExtra = $('#sign-in-extra');
var usingSignupForm = false;

var authenticatedInfo = null;
signupExtra.hide();

function getAuthenticationInfo() {
    const username = userNameInput.val();
    const password = passwordInput.val();
    if(username && password)
        return {
            username: username,
            password: password
        }
    return null;
}

authenticationForm.submit(function(event){
    event.preventDefault();
});

signupBtn.click(function(event){    
    const authInfo = getAuthenticationInfo();
    if(!authInfo) return;
    console.log('sign up');
    authenticationPanel.hide();
    const data = {
        username: authInfo.username,
        password: authInfo.password
    };
    $.ajax({
        type: "POST",
        url: '/authenticate/signup',
        data: data,
        success: (token)=>{
            if(!authenticatedInfo)
                authenticatedInfo = {};
            authenticatedInfo.token = token;
        },
        error: (jqXHR, exception)=>{
            alert('Sign up failed');
            authenticationPanel.show();
        }
    });
});

signinBtn.click(function(event){
    const authInfo = getAuthenticationInfo();
    if(!authInfo) return;
    console.log('sign in');
    authenticationPanel.hide();
    const data = {
        username: authInfo.username,
        password: authInfo.password
    };
    $.ajax({
        type: "POST",
        url: '/authenticate/signin',
        data: data,
        success: (token)=>{
            if(!authenticatedInfo)
                authenticatedInfo = {};
            authenticatedInfo.token = token;
        },
        error: (jqXHR, exception)=>{
            alert('Sign in failed');
            authenticationPanel.show();
        }
    });
});


