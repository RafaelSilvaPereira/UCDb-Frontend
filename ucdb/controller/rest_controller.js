export {postData, getData, deleteData};

const protocol = "https://";
const domain = "ucdb-aplicattion.herokuapp.com/";
const apiVersion = "api/v1/";
const urlBody = protocol + domain + apiVersion;

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

function deleteData(path, data = {}, authorization) {
    return   fetch(urlBody + encodeURI(path), initDefine(data, authorization, "DELETE"))
        .then(response => {
                if(!!response && response.ok) {
                    try {
                        return  response.json();
                    } catch (e) {
                        alert("Não foi possivel deletar este item!, tente denovo mais tarde")
                    }
                }
            }
        ).catch(err => err);
}

function postData(path, data = {}, authorization) {
      return   fetch(urlBody + encodeURI(path), initDefine(data, authorization, "POST"))
          .then(response => {
              if(!!response && response.ok) {
                  try {
                      return  response.json();
                  } catch (e) {
                      alert("O banco de dados não respondeu essa requisição, por favor tente novamente mais tarde.")
                  }
              }
          }
          ).catch(err => err); // esconendo de mim meus propios erros!!!
}


function getData(path,  authorization) {
    return fetch(urlBody + encodeURI(path), initDefine(null,authorization,"GET"))
        .then(response => {
                if(!!response && response.ok) {
                    try {
                        return  response.json();
                    } catch (e) {
                    alert("Não foi possivel recuperar esse dado, por favor tente mais tarde")
                    }
                }
            }
        ).catch(err => err);
}

