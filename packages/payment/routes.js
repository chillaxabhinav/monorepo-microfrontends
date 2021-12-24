import loadable from '@loadable/component';

const PaymentInitialPage = loadable(() => import(/* webpackChunkName: "paymentInitialPage" */ './src/pages/initial'));

const paymentRoutes = [
    {
        path: '/payment',
        component: PaymentInitialPage,
        ssr: false
    }
];

export default paymentRoutes;