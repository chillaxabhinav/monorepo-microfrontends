export function urlEncodedParams(params: Record<string | number, string | number | boolean>) {
    let param = "";
    for(let key in params) {
        if(params.hasOwnProperty(key)) param += (param?"&":"") + encodeURIComponent(key)+"="+encodeURIComponent(params[key]);
    }
    return param;
}

export function generateRandomAlphaNumeric(length = 20) {
    return Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');
}