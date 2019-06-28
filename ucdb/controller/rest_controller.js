function postData(url, data = {}) {
        return fetch("http://" + url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "cache-control": "no-cache"
            },
            redirect: 'follow',
            referrer: 'client',
            body: JSON.stringify(data), 
        })
        .then(response => response.json()); 
}


function getData(url,  authorization) {
    if(authorization !== "") {
        return fetch("http://"+url, {
        method : "GET",
        headers : {
            'Content-Type': 'application/json; charset=utf-8',
            "cache-control": "no-cache",
            "Authorization": `Bearer ${authorization}`
            }
        }).then(response => response.json())
    } else {
        return fetch("http://"+encodeURI(url), {
        method : "GET",
        headers : {
            'Content-Type': 'application/json',
            "cache-control": "no-cache",
            }
        }).then(response => response.json())
    }
}

export {postData, getData};