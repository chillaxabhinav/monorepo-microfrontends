import React from "react";

type Props = {
    mobilePrefix : string;
    openCountryAutoCompleter : any;
    value : string;
    onChange : React.ChangeEventHandler<HTMLInputElement>;
}

const PhoneEmailInput:React.FC<Props> = (props) => {
    const {mobilePrefix, openCountryAutoCompleter, value, onChange} = props;

    return (
        <div tw="flex items-center">
            <div tw="mr-5 border-b-2 border-gray-400" onClick={openCountryAutoCompleter}>
                {mobilePrefix}
            </div>
            <div tw="flex items-center mb-5">
                <input tw="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-gray-200"
                    type="text"
                    placeholder="Enter Mobile No. / Email" 
                    value={value} 
                    onChange={onChange}  
                />
            </div>
        </div>
    )
}

export default PhoneEmailInput;