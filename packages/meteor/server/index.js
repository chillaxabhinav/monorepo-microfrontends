import express from 'express';
import compression from 'compression';
import path from 'path';
import renderer from './helpers/renderer';
import { createReduxStore } from '../index';
import { matchRoutes } from 'react-router-config';
import routes from 'moduleRoutes'; // Routes from the running Module
import { interceptor } from './interceptor';
import cookieMiddleware, { getCookieHelpers } from './cookie';
import useragent from './middlewares/useragent';
import paths from '../shared/config/paths';
import { injectAsyncReducer } from "../locker/createStore";

const port = process.env.PORT || 8080;

const app = express();

// Add gzip compression to responses
app.use(compression());

app.use(paths.publicPath, express.static(path.resolve(paths.clientBuild), { index: false }));

// Anything unresolved is serving the application and let
// react-router do the routing!

app.use(cookieMiddleware);

app.use(useragent);

app.use(function(req, res, next) {
	const helpers = { fetch: interceptor(req, res), ...getCookieHelpers(req, res)};
	res.locals.store = createReduxStore({}, helpers);
	next();
});

app.use((req, res, next) => {
	const store = res.locals.store;
	store.dispatch({
	  type: 'SET_SHELL_PARAM',
	  payload: {
		useragent: { ...res.locals.useragent }
	  }
	});
	next();
});

app.get('**', async (req, res) => {

	const serverStore = res.locals.store;

	const promises = matchRoutes(routes, req.path).map(async ({ route }) => {
		if (route.ssr && route.ssr === true) {
			if (route && route.component && route.component.displayName && route.component.displayName === 'Loadable') { // Means component is a loadable component, loadable component handling here
				const asyncComponent = await route.component.load();
				const component = await asyncComponent.default;
				if (component && component.reducers) {
					injectAsyncReducer(serverStore, component.reducers);
				}
				return component && component.loadData ? serverStore.dispatch(component.loadData) : null;
			} else { // Not a loadable component
				if (route && route.component && route.component.reducers) {
					injectAsyncReducer(serverStore, route.component.reducers);
				};
				return route && route.component && route.component.loadData ?  serverStore.dispatch(loadData): null;
			}
		} else {
			return null;
		}
	}).map(promise => {
		if (promise) {
			return new Promise((resolve, reject) => {
				promise.then(resolve).catch(e => {
					console.error(e);
					resolve();
				});
			})
		}
	});

	Promise.all(promises).then(async () => {
		const context = {};

		const content = await renderer(req, res, serverStore, context);

		if (context.notFound) {
			res.status(404);
		}

		res.send(content);
	});

});

app.listen(port, () => {
	console.log(`Server running on http:localhost:${port}`);
});
