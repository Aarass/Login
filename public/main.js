const loginForm = document.forms[0];
const registerForm = document.forms[1];
const loginFormMsg = document.getElementById('loginFormMsg');
const registerFormMsg = document.getElementById('registerFormMsg');


let loginIsChecked = false;
let registerIsChecked = false;

function toggleLogin() {
  registerForm.style = 'visibility: hidden';
  if(!loginIsChecked)
    loginForm.style = 'visibility: visible';
  else
    loginForm.style = 'visibility: hidden';
  loginIsChecked = !loginIsChecked;
  registerIsChecked = false;
}

function toggleRegister() {
  loginForm.style = 'visibility: hidden';
  if(!registerIsChecked)
    registerForm.style = 'visibility: visible';
  else
    registerForm.style = 'visibility: hidden';
  registerIsChecked = !registerIsChecked;
  loginIsChecked = false;
}


document.getElementById('login').addEventListener('click', toggleLogin);
document.getElementById('register').addEventListener('click', toggleRegister);
document.getElementById('goToLogin').addEventListener('click', toggleLogin);
document.getElementById('goToRegister').addEventListener('click', toggleRegister);
loginForm.addEventListener('keypress', (e) => {
  if(e.key === 'Enter')
    login();
});
registerForm.addEventListener('keypress', (e) => {
  if(e.key === 'Enter')
    register();
});


async function login() {
  const values = Array.prototype.slice.call(document.querySelectorAll('#form1 input')).map(item => item.value);
  if(!values[0] || !values[1]){
    loginFormMsg.style = 'visibility: vissible';
    loginFormMsg.style = 'background-color: var(--fail-color)';
    loginFormMsg.textContent = 'Fill in all fields';
    return;
  }
  const data = {
    username: values[0],
    password: values[1]
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/login', options);
  const isConfirmed = await response.json();
  console.log(isConfirmed);
  if(isConfirmed)
    loginSuccesful()
  else
    loginUnsuccesful()
}
async function register() {
  const values = Array.prototype.slice.call(document.querySelectorAll('#form2 input')).map(item => item.value);
  if(!values[0] || !values[1] || !values[2]) {
    registerFormMsg.style = 'visibility: vissible';
    registerFormMsg.style = 'background-color: var(--fail-color)';
    registerFormMsg.textContent = 'Fill in all fields';
    return;
  }
  else if(values[1] !== values[2]) {
    registerFormMsg.style = 'visibility: vissible';
    registerFormMsg.style = 'background-color: var(--fail-color)';
    registerFormMsg.textContent = 'Passwords must be matching';
    return;
  }

  const data = {
    username: values[0],
    password: values[1]
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('/register', options);
  const isConfirmed = await response.json();
  console.log(isConfirmed);
  if(isConfirmed)
    registerSuccesful();
  else
    registerUnsuccesful();
}
let isLoged = false;
function loginSuccesful() {
  loginFormMsg.style = 'visibility: vissible';
  loginFormMsg.style = 'background-color: var(--succes-color)';
  loginFormMsg.textContent = 'Login Succesful!';
}
function loginUnsuccesful() {
  loginFormMsg.style = 'visibility: vissible';
  loginFormMsg.style = 'background-color: var(--fail-color)';
  loginFormMsg.textContent = 'Login unsuccesful. Username or password are incorect.';
}
function registerSuccesful() {
  registerFormMsg.style = 'visibility: visible';
  registerFormMsg.style = 'background-color: var(--succes-color)';
  registerFormMsg.textContent = 'Register succesful!';
}
function registerUnsuccesful() {
  registerFormMsg.style = 'visibility: visible';
  registerFormMsg.style = 'background-color: var(--fail-color)';
  registerFormMsg.textContent = 'Login unsuccesful. Username is taken. Try again.';
}
