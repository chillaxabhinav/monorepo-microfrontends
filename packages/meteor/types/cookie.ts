type CookieValue = string | number | boolean | null;
export type Cookies = Record<string, CookieValue>;

export interface CookieOptions {
    maxAge?: number | undefined;
    signed?: boolean | undefined;
    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
}

export interface CookieHelpers {
    getCookie(key: string): CookieValue;
    getAllCookies(): Cookies,
    setCookie(key: string, value: CookieValue, opts?: CookieOptions): void,
    clearCookie(key: string): void
}