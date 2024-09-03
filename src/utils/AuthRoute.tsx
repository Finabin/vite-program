import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookie from 'js-cookie';
const allowList = ['/', '/register'];
const loginRoute = '/';

export default function AuthRoute(props: any) {
    const location = useLocation();
    const history = sessionStorage.getItem('historyRouter');
    useEffect(() => {
        sessionStorage.setItem('historyRouter', location.pathname);
    },[])
    // children 为子组件
    const { children } = props;
    const token = Cookie.get('satoken');
    if (token && token !== 'undefined') {
        if (location.pathname === loginRoute) {
            return <Navigate to={history as string}></Navigate>;
        } else {
            return <>{children}</>;
        }
    } else {
        // 无 token 的状态下，如果要跳转的路由是白名单中的路由，正常跳转
        if (allowList.includes(location.pathname || '')) {
            return <>{children}</>;
        } else {
            // 无 token 且非白名单路由，重定向至登录页
            return <Navigate to={loginRoute}></Navigate>;
        }
    }
}
