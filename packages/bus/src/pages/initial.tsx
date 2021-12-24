import React from 'react';
import { useState } from 'react';
import logo from '../../public/logo.svg';

const InitialPage: React.FC = () => {
	const [count, setCount] = useState(0);
	return (
		<div tw="bg-red-600">
			<header>
				<img src={logo} alt="logo" />
				<p>Hello from bus app</p>
			</header>
			<p>
				<button tw='bg-red-500 hover:bg-red-700' type="button" onClick={() => setCount((count) => count + 1)}>
					count is: {count}
				</button><br/>
				<button tw='bg-purple-200 hover:bg-purple-700'>
					Util func test
				</button>
			</p>
		</div>
	)
};

export default InitialPage;
