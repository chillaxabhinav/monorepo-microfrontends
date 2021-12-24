
import { sha512 } from "../lib/sha512";
import { generateRandomAlphaNumeric, urlEncodedParams } from "@ixigo/utils";

const otpUrl = {
    email: '/api/v2/oauth/sendotp/verification/email',
    mobile: '/api/v2/oauth/sendotp/user/phone'
}

const getToken = ({getAllCookies, setCookie, mobile, email, prefix, type}) => {
    const {
        clientId = /mobile/i.test(navigator.userAgent) ? "iximweb" : "ixiweb", // move clientId specific logic to a comon place
        ixiUID
    } = getAllCookies();
    const deviceTime = new Date().getTime();
    let uid = ixiUID;
    if(!uid) {
        uid = generateRandomAlphaNumeric();
        setCookie("ixiUID", uid);
    }
    const token = type === 'email' ? sha512([email, clientId, uid, deviceTime].join("~")) : sha512([mobile, "+91", clientId, uid, deviceTime].join("~"))
    return {token, deviceTime}
}




export const sendOtp = ({mobile, email, prefix = '+91', type}) => async (
    dispatch,
    getState,
    {fetch, setCookie, getAllCookies}
) => {
    const {token, deviceTime} = getToken({getAllCookies, setCookie, mobile, email, prefix, type})
    const typeKey = type === 'email' ? {email} : {phone: mobile}
    return fetch({
        url: otpUrl[type],
        method: "post",
        body: urlEncodedParams({
            sixDigitOTP: true,
            token, // sha512 access token
            ...(type === 'mobile' && {resendOnCall: false, prefix}),
            ...typeKey
        }),
        contentType: "application/x-www-form-urlencoded",
        headers: {
            deviceTime
        }
    }).then(console.log);
}