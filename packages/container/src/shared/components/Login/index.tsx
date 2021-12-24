import React, { useState } from "react";
import { useAppDispatch } from "@ixigo/meteor";
import { sendOtp } from "../../actions/sendOtp";
import { verifyOtp } from "../../actions/verifyOtp";
import { useUserInfo } from "../../hooks/login/userInfo";
import PhoneEmailInput from './phoneEmailInput';

export default function LoginWidget(props: any) {
    const {headerText, subHeaderText} = props;
    const dispatch = useAppDispatch();
    const [
        { loggedIn, loading, info },
        setUserInfo
    ] = useUserInfo();
    const {
        name,
        fn
    } = info || {};
    const [otp, setOtp] = useState('');
    const [screen, setScreen] = useState(0);
    const [type, setType] = useState<'email' | 'mobile'>('email');
    const [value, setValue] = useState('');
    
    function onSendOtpClick() {
        const param = type === 'email' ? {email: value, type} : {mobile: value, prefix: '+91', type};
        return dispatch(sendOtp(param)).then(() => {
            setScreen(1);
        });
    }

    const showInput = !loggedIn && !loading;

    function onVerifyOtpClick() {
        return dispatch(verifyOtp({value, mobilePrefix: "+91", otp}, type)).then((login) => {
            login && setUserInfo({...login, loggedIn: !!login.uid})
            setScreen(0);
        });
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value.trim();
        const type = /^[0-9]+$/.test(value) ? 'mobile' : 'email';
        setType(type);
        setValue(value);
    }

    return <div tw="bg-white shadow-lg rounded px-8 pt-6 pb-8 my-4 flex flex-col grid place-items-center">
            <div tw="font-medium text-2xl">
                {headerText || 'Welcome to ixi'}
            </div>

            <div tw="font-normal text-xl">
                {subHeaderText || 'Get started to enjoy a seamless travel planning experience'}
            </div>

            <div>
                <PhoneEmailInput mobilePrefix={'+91'} onChange={inputHandler} openCountryAutoCompleter={() => {}} value={value} />
            </div>


        {loading && <div tw="mb-4">
            Checking Login state...
        </div>
        }
        {loggedIn && <div tw="mb-4">
            Hello <b>{fn || name}</b>
        </div>
        }
        {showInput && screen === 0 && <div className="mb-4">
            <button tw="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-4" type="button" onClick={onSendOtpClick}>
                Send Otp
            </button>
        </div>}
        {showInput && screen === 1 && <div tw="mb-6">
            <label tw="block text-sm font-bold mb-2" htmlFor="otp">
                Otp
            </label>
            <input tw="shadow appearance-none border rounded w-full py-2 px-3 mb-3" id="otp" type="password" placeholder="******" value={otp} onChange={(e) => setOtp(e.target.value)}/>
            <button tw="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-4" type="button" onClick={onVerifyOtpClick}>
                Login
            </button>
        </div>}
    </div>
}