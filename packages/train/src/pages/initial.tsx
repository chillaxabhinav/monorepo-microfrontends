import React from 'react';
import { useState } from 'react';
import { Input } from '@ixigo/components';
import ButtonNew from './testButton/testButton';
import logo from '../../public/logo.svg';

const InitialPage: React.FC = () => {
	const [count, setCount] = useState(0);
	const [firstName, setFirstName] = useState('');
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const onFirstNameChange = (value: string) => {
		if(value.length > 5) {
			setIsError(true);
			setErrorMessage('something went wrong');
		} else {
			setIsError(false);
			setErrorMessage('');
		}
		setFirstName(value);

	}
	return (
		<div>
			<Input 
				value = {firstName} 
				label = 'First Name'
				onChangeHandler = {onFirstNameChange} 
				isError = {isError} 
				errorMessage = {errorMessage}
				placeholder = "Please input something"
			/>
			<ButtonNew />
			<div tw="max-w-sm mx-auto overflow-hidden bg-indigo-300 rounded-lg shadow-lg">
				<header>
					<img src={logo} alt="logo" />
					<p>Hello from Train App</p>
					<p>
						<button type="button" onClick={() => setCount((count) => count + 1)}>
							count is: {count}
						</button><br/>
						<button tw='bg-purple-200 hover:bg-purple-700'>
							Util func test
						</button>
					</p>
				</header>
			</div>
		</div>
	)
};

export default InitialPage;