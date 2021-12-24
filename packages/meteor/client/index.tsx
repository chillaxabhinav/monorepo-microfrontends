import React from 'react';
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { createReduxStore, Provider } from '../locker/createStore';
import App from '../shared/App';
import { interceptor } from './interceptor';
import { getCookieHelpers } from "./cookie";

declare global {
    interface Window {
		__SSR__: boolean;
		__INITIAL_STATE__: object;
		btoa: (data: string) => string;
		atob: (data: string) => string
	}
};


const ifSSR = window ? window.__SSR__ ? true : false : false;

if (ifSSR) {

	loadableReady(() => {

		const element = document.getElementById('root');
	
		const initialStateFromServer = window && window.__INITIAL_STATE__;
	
		const helpers = getCookieHelpers();
		const store = createReduxStore(initialStateFromServer, {thunkOptions: {
            fetch: interceptor({isMobile: /mobile/i.test(navigator.userAgent)}, helpers),
            ...helpers,
            btoa: window.btoa,
            atob: window.atob
        }});
	
		const app = (
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);
		hydrate(app, element);
		if(process.env.NODE_ENV === "development" && module.hot) {
			module.hot.accept();
		}
	});

} else {

	const helpers = getCookieHelpers();
	const store = createReduxStore({}, {thunkOptions: {
        fetch: interceptor({isMobile: /mobile/i.test(navigator.userAgent)}, helpers),
        ...helpers,
        btoa: window.btoa,
        atob: window.atob
    }});

	render(
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);
	if(process.env.NODE_ENV === "development" && module.hot) {
		module.hot.accept();
	}
}
