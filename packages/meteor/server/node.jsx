import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from '../index';
import App from "../shared/App";

const SSRApp = ({ req, context, store }) => (
	<Provider store={store}>
		<StaticRouter location={req.path} context={context}>
			<App/>
		</StaticRouter>
	</Provider>
);

export default SSRApp;
