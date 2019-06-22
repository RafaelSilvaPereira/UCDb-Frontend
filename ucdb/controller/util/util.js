const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const convertStringToValidUrlValue = (string) => {
    const baseString = string.toUpperCase();

    let response = "";
    let i = 0
    while(i < baseString.length - 1) {
        response += (baseString.charCodeAt(i++) + "_")
    }
    response += baseString.charCodeAt(i);
    return response;
};

export {isNumber, convertStringToValidUrlValue}