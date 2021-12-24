import React from 'react';

const Input = (props: any) => {
    const { value, label, onChangeHandler, isError, errorMessage, placeholder} = props;
    const onInputChangeHandler = (event: any) => {
        onChangeHandler(event.target.value)
    }
    return (
        <div>
            { label ? <div>{label}</div> : null}
            <input placeholder = {placeholder} value = {value} onChange = {onInputChangeHandler}/>
            { isError ? <div>{errorMessage}</div> : null}
        </div>
    )
}

export default Input;