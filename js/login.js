const form = document.getElementsByTagName("form")[0];
const email = document.getElementById("inputEmail");
const button = document.getElementsByTagName("button")[0];
const password = document.getElementById("inputPassword");


email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

password.addEventListener("input", function(event){
    if (password.validity.tooLong || password.validity.tooShort) {
        password.setCustomValidity("8-20 numbers please");
    } else {
        password.setCustomValidity("");
    }
})

form.addEventListener("submit", function (event) {
    if(email.validity.valid && password.validity.valid) {
        event.preventDefault();
    }
});

button.addEventListener("click", function(event) {
    if(email.validity.valid && password.validity.valid) {
        window.location.replace("inicio.html");
    }
});

