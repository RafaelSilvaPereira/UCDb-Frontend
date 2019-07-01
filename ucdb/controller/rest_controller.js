export {postData, getData, deleteData};

function initDefine(data, authorization, method) {
    let init;
    let defautHeader = {'Accept' : '*/*',
        'Content-Type': 'application/json; charset=utf-8', "cache-control": "no-cache",
        "Cache-control": "no-cache","accept-encoding": "gzip, deflate"};

    if(!!data) {
        if(!!authorization) { // init com data e autorização
            defautHeader.Authorization = `${authorization}`;
            init = {
                method: `${method}`, mode: 'cors', cache: 'no-cache',
                headers: defautHeader,
                redirect: 'follow',
                referrer: 'client',
                body: JSON.stringify(data)
            }
        } else { // init com data e sem autorização
            init = {
                method: `${method}`, mode: 'cors', cache: 'no-cache',
                headers: defautHeader,
                redirect: 'follow',
                referrer: 'client',
                body: JSON.stringify(data)
            }
        }
    } else { // init com nenhuma data e autorização
        if(!!authorization) {
            defautHeader.Authorization = `${authorization}`;
            init = {
                method: `${method}`, mode: 'cors', cache: 'no-cache',
                headers: defautHeader,
                redirect: 'follow',
                referrer: 'client'
            }
        }else { // sem data e sem autorização
            init = {
                method: `${method}`, mode: 'cors', cache: 'no-cache',
                headers: defautHeader,
                redirect: 'follow',
                referrer: 'client'
            }
        }

    }
    return init;
}


function deleteData(url, data = {}, authorization) {
    return   fetch("http://" + encodeURI(url), initDefine(data, authorization, "DELETE"))
        .then(response => {
                if(!!response && response.ok) {
                    try {
                        return  response.json();
                    } catch (e) {
                    }
                }
                else {

                }
            }
        ).catch(err => err); // esconendo de mim meus propios erros!!!
}




function postData(url, data = {}, authorization) {
      return   fetch("http://" + encodeURI(url), initDefine(data, authorization, "POST"))
          .then(response => {
              if(!!response && response.ok) {
                  try {
                      return  response.json();
                  } catch (e) {
                  }
              }
              else {

              }
          }
          ).catch(err => err); // esconendo de mim meus propios erros!!!
}


function getData(url,  authorization) {
    return fetch("http://" + encodeURI(url), initDefine(null,authorization,"GET"))
        .then(response => {
                if(!!response && response.ok) {
                    try {
                        return  response.json();
                    } catch (e) {
                    }
                }
                else {

                }
            }
        ).catch(err => err); // esconendo de mim meus propios erros!!!
}

