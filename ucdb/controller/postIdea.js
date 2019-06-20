//POSTAR UM USUARIO

var data = JSON.stringify({
    "email": "mrs.borges@ccc.ufcg.edu.br",
    "firstName": "Athila",
    "secondName": "Matheus",
    "password": "senha"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("POST", "http://localhost:8080/api/v1/users/");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "52bd2c17-7559-4ca0-8375-84b3c271aba4");

xhr.send(data);


// post de login

var data = JSON.stringify({
    "email": "rafael.pereira@ccc.ufcg.edu.br",
    "password": "pinata"
  });
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "http://localhost:8080/api/v1/login/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "ea28ff58-5c91-459a-b6f2-a29e2c986548");
  
  xhr.send(data);

// get privado
var data = JSON.stringify({
    "name": "Rafael",
    "login": "rafaelsp",
    "password": "1234"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("GET", "http://localhost:8080/api/v1/users/private");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWZhZWwucGVyZWlyYUBjY2MudWZjZy5lZHUuYnJwaW5hdGEiLCJleHAiOjE1NjA3MjU2MDd9.dEq3jBmAjaDk_TVXyO1N34Bvz20i5Y_vUQxMwBXP3VP8kMG6vJ8MA_5eey_q7Gq6LpCbdFbLHfIdpRAX0_m_uQ");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "42836aa2-7fd2-4025-9873-b9f0dc5255f3");

xhr.send(data);

//