import type {CookieHelpers, CookieOptions, Cookies} from '../types/cookie';

export function parseCookies(): Cookies {
    const cookies: Cookies = {};
    return document.cookie.split(";").reduce((cookies, cookie) => {
        if(!cookie) return cookies;
        const [name, val] = cookie.trim().split("=");
        cookies[name] = decodeURIComponent(val.replace(/^"/, '').replace(/"$/, ''));
        return cookies;
    }, cookies);
}



/**
 * 
 * @param time number of days from today when cookie will expire or will be defaulted to 20 year from now
 * @returns a set of common cookie options
 */
function cookieOptions(time?: number) {
    return {
        path: "/",
        domain: ".ixigo.com",
        expires: time ? new Date(Date.now() + time * 86400000) : getExpiryTime()
    }
}

/**
 * use it to get date after the 20 years from current date
 */
function getExpiryTime() {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 20);
    return expires;
}
export function writeCookie(key: string, value: number | string | boolean,  {path, domain, expires}: CookieOptions = {}) {
    const cookieStr = `${key}=${value};${expires ? `expires=${expires.toUTCString()};` : ''}${path ? `path=${path};` : ''}${domain ? `domain=${domain};` : ''}`;
    document.cookie = cookieStr;
}

export const getCookieHelpers = (): CookieHelpers => {
    const parsedCookies = parseCookies();
    return {
        getCookie: (key) => parsedCookies[key],
        getAllCookies: () => ({...parsedCookies}),
        setCookie: (key, val, opts?) => {
            writeCookie(key, val, {...cookieOptions(), ...opts});
            parsedCookies[key] = val;
        },
        clearCookie: (key) => {
            document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    };
}