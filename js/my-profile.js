"use strict"
var profile = localStorage.getItem("emailProfile");

var logOut = document.getElementById("logOut");


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
 document.getElementById("profileData").innerHTML = profile;

});

//Delete Customer LogIn Data

logOut.addEventListener("click", function(e){
    localStorage.clear();
})
