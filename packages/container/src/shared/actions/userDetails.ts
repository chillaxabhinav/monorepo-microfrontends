import { AppThunkAction } from "@ixigo/meteor";
import { LoginResponse } from "../types/login";
export const getUserDetails = (): AppThunkAction<Promise<Partial<LoginResponse> & {loggedIn: boolean}>> => async (
    dispatch,
    getState,
    {fetch, getCookie}
) => {
    const at = getCookie('at')
    if(!at) {
        return {loggedIn: false};
    }
    return fetch<{data: LoginResponse}>({
        url: "/api/v2/oauth/userinfo",
        method: "post",
        body: "",
        contentType: "application/x-www-form-urlencoded"
    }).then((res) => {
        const {body: {data: login} = {}} = res;
        return {...login, loggedIn: !!(login && login.uid)};
    });
}