import loadable from '@loadable/component';

const BusInitialPage = loadable(() => import(/* webpackChunkName: "busInitialPage" */ './src/pages/initial'));

const busRoutes = [
    {
        path: '/bus',
        component: BusInitialPage,
        ssr: false
    }
];

export default busRoutes;