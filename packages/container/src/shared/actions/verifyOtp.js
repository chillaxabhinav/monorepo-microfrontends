
import { urlEncodedParams } from "@ixigo/utils";

export const verifyOtp = (userData, type) => (
    dispatch,
    getState,
    {fetch, setCookie, btoa}
) => {    
    const isPhone = type == "mobile";
    const grantType = isPhone ? 'photp' : 'emotp';
    const token = btoa((isPhone ? (userData.value + '~' + userData.mobilePrefix) : userData.value) + '~' + userData.otp);

    return fetch({
        url: "/api/v3/oauth/login",
        method: "post",
        body: urlEncodedParams({
            grant_type: grantType,
            token,
            sixDigitOTP: true
        }),
        contentType: "application/x-www-form-urlencoded"
    }).then((res) => {
        const {body: {data: login} = {}} = res;
        if(login) {
            login.access_token && setCookie('at', login.access_token);
            setCookie('lt', grantType);
        }
        
        return login;
    });
}
