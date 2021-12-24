import loadable from '@loadable/component';

const FlightInitialPage = loadable(() => import(/* webpackChunkName: "flightInitialPage" */ './src/pages/initial'));

const flightRoutes = [
    {
        path: '/flight',
        component: FlightInitialPage,
        ssr: false
    }
];

export default flightRoutes;