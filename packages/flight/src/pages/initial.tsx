import React from 'react';
import logo from '../../public/logo.svg';
import { Button, Text } from '@ixigo/components';
const InitialPage: React.FC = () => {
	return (
		<div tw="p-20 overflow-hidden rounded-lg shadow-lg bg-yellow-400">
			<Button/>
			<Text/>
			<header>
				<img src={logo} alt="logo" />
				<p>Hello from flight app</p>
				<p>
					<br/>
					<button tw='bg-purple-200 hover:bg-purple-700'>
						Util func test
					</button>
				</p>
			</header>
		</div>
	)
};

export default InitialPage;

// import { Magician } from '@ixigo/meteor';
// import above line at the top
// interface HomeState {
// 	isHome: boolean;
// }
// export default Magician({
// 	reducers: {
// 		home: (state: HomeState = {isHome: false}, {type, payload}: {type: string, payload: HomeState}) => {
// 			if(type === 'UPDATE_HOME_DATA') {
// 				return {...state, ...payload };
// 			}
// 			return state;
// 		}
// 	},
// 	loadData: (dispatch, getState) => {
// 		dispatch({
// 			type: 'UPDATE_HOME_DATA',
// 			payload: {
// 				isHome: true,
// 			}
// 		});
// 		console.log(getState());
// 	}
// })(InitialPage);