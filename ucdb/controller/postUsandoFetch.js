function postData(url = "http://localhost:8080/api/v1/users/", data = {}) {
    // Default options are marked with *
        return fetch("http://"+url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                "cache-control": "no-cache"
            },
          redirect: 'follow', // manual, *follow, error
          referrer: 'client', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
}

data = {
    "email": "mrs.borges@ccc.ufcg.edu.br",
    "firstName": "Athila",
    "secondName": "Matheus",
    "password": "senha"
};

url = "localhost:8080/api/v1/users/";


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "http://" + url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");


    xhr.send(JSON.stringify(data));