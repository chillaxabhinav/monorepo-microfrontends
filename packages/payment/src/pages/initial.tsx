import React from 'react';
import { useState } from 'react';
import logo from '../../public/logo.svg';

const InitialPage: React.FC = () => {
	const [count, setCount] = useState(0);
	return (
		<div tw="max-w-sm mx-auto overflow-hidden bg-blue-300 rounded-lg shadow-lg">
		<header>
			<img src={logo} alt="logo" />
			<p>Hello from payment app</p>
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
	)
};

export default InitialPage;