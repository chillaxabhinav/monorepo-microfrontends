import cookieParser from 'cookie-parser'
import type { RequestHandler, Response } from 'express'
import type { CookieHelpers, Cookies } from '../types/cookie'

const cookieMiddleware: RequestHandler = (req, res, next)  => {
    cookieParser()(req, res, () => {
        const cookies = { ...req.cookies }
        res.locals.cookies = cookies
        next()
    })
}

export default cookieMiddleware;

type Locals = {
    cookies: Cookies
}
export function getCookieHelpers(res: Response<unknown, Locals>): CookieHelpers {
    return {
        getCookie: (key) => {
            return res.locals.cookies[key];
        },
        getAllCookies: () => ({...res.locals.cookies}),
        setCookie: (key, val, opts = {}) => {
            if (res.headersSent) {
                return;
            }
            res.cookie(key, val, { path: "/", domain: ".ixigo.com", ...opts });
            res.locals.cookies[key] = val;
        },
        clearCookie: (key) => {
            if (res.headersSent) {
                return;
            }
            res.clearCookie(key, {});
            res.locals.cookies[key] = null;
        }
    }
}