import { lazy } from 'react'

const routers = [
    {
        path: '/',
        component: lazy(() => import('../pages/LoginPage')),
        title: '登陆',
    },
    {
        path: '/main',
        component: lazy(() => import('../pages/IndexPage')),
        title: '首页',
    },
    {
        path: '/404',
        component: lazy(() => import('../pages/404')),
        title: '404',
    }
]

export default routers