import loadable from '@loadable/component';

const HelpcenterInitialPage = loadable(() => import(/* webpackChunkName: "helpcenterInitialPage" */ './src/pages/initial'));

const helpcenterRoutes = [
    {
        path: '/helpcenter',
        component: HelpcenterInitialPage,
        ssr: false
    }
];

export default helpcenterRoutes;