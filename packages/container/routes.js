import loadable from '@loadable/component';

import { routes as busRoutes } from '@ixigo/bus';
import { routes as flightRoutes } from '@ixigo/flight';
import { routes as helpcenterRoutes } from '@ixigo/helpcenter';
import { routes as paymentRoutes } from '@ixigo/payment';
import { routes as trainRoutes } from '@ixigo/train';

import Home from './src/pages/home';

const NotFound = loadable(() => import(/* webpackChunkName: "commonNotFoundPage" */'./src/pages/notFound'));

const containerRoutes = [
    ...busRoutes,
    ...flightRoutes,
    ...helpcenterRoutes,
    ...paymentRoutes,
    ...trainRoutes,
    {
        path: '/',
        component: Home,
        exact: true,
        ssr: false
    },
    {
        path: '*',
        component: NotFound,
        ssr: false
    }
];

export default containerRoutes;