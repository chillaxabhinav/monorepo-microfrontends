import loadable from '@loadable/component';

const TrainInitialPage = loadable(() => import(/* webpackChunkName: "trainInitialPage" */ './src/pages/initial'));

const trainRoutes = [
    {
        path: '/train',
        component: TrainInitialPage,
        ssr: false
    }
];

export default trainRoutes;