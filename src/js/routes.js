const start  =      () =>   import('@/vue/components/app_start');
const uploader =    () =>   import('@/vue/components/app_uploader');
const loader =      () =>   import('@/vue/components/app_loader');
const success =     () =>   import('@/vue/components/app_success');


const routes = [
    {
        path: '/',
        name: 'app_start',
        component: start
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: uploader
    },
    {
        path: '/pending_verification',
        name: 'loader',
        component: loader
    },
    {
        path: '/verification_success',
        name: 'success',
        component: success
    }
];

export default routes;