import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import showPrompt from '../../utils/prompt';
import { Login } from '../../apis/login';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import './index.less';

export default function LoginPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [checkPwd, setCheckPwd] = useState('')
    const [loginFunc, setLoginFunc] = useState(1)
    const [funcPage, setFuncPage] = useState(1)

    const onFinish = async (values: any) => {
        const result = await Login(values);
        if (result.status === 200) {
            showPrompt(messageApi, '登陆成功！', 'success')
            Cookies.set('satoken', result.satoken as string, { expires: 7 });
            navigate('/main');
        }
        else {
            showPrompt(messageApi, result.msg, 'error')
        }
    };

    const onRegister = async (values: any) => {
        // const result = await Register(values);
        // if (result.status === 200) {
        //     showPrompt(messageApi, '注册成功！', 'success')
        //     setFuncPage(1)
        // }
        // else {
        //     showPrompt(messageApi, result.msg, 'error')
        // }
        showPrompt(messageApi, '注册成功！', 'success')
        setUserName('')
        setPassword('')
        setCheckPwd('')
        setFuncPage(1)
    }

    return (
        <>
            {contextHolder}
            <div className='login-container'>
                {
                    (funcPage === 1 && <div className='login-func-change' onClick={() => setFuncPage(2)}>注册</div>)
                }
                {
                    (funcPage === 2 && <div className='login-func-change' onClick={() => setFuncPage(1)}>登陆</div>)
                }
                <div className='login-wechat-scanner-box'>
                    <div className='login-wechat-scanner-title'><b>扫码登陆</b></div>
                    <div className='login-wechat-scanner'></div>
                    <div className='login-wechat-scanner-img'><img src="" alt="" /></div>
                </div>
                {
                    (funcPage === 1 &&
                        <>
                            <div className='login-box'>
                                <div>
                                    <button onClick={() => setLoginFunc(1)} className={`login-title` + (loginFunc === 1 ? '-active' : '')}>账号密码登陆</button>
                                    <button onClick={() => setLoginFunc(2)} className={`login-title` + (loginFunc === 2 ? '-active' : '')}>手机号登陆</button>
                                </div>
                                {
                                    (loginFunc === 1 &&
                                        <div>
                                            <input type="text" placeholder='请输入账号' value={userName} onChange={(e) => setUserName(e.target.value)} className='login-input' />
                                        </div>
                                    )
                                }
                                {
                                    (loginFunc === 2 &&
                                        <div>
                                            <input type="text" placeholder='请输入手机号' value={userName} onChange={(e) => setUserName(e.target.value)} className='login-input'/>
                                        </div>
                                    )
                                }
                                <div>
                                    <input type="text" placeholder='请输入密码' value={password} onChange={(e) => setPassword(e.target.value)} className='login-input'/>
                                </div>
                                <div className='login-checkbox'>
                                    <Checkbox>我已阅读并同意<span className='login-checkbox-link'>用户协议</span>、<span className='login-checkbox-link'>隐私政策</span>、<span className='login-checkbox-link'>产品服务协议</span></Checkbox>
                                </div>
                                <div>
                                    <button className="login-box-button" onClick={onFinish}>登陆</button>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    (funcPage === 2 &&
                        <>
                            <div className='login-box'>
                                <div>
                                    <button className='login-title-active'>账号注册</button>
                                </div>
                                <div >
                                    <input type="text" placeholder='请输入账号' value={userName} onChange={(e) => setUserName(e.target.value)} className='register-input'/>
                                </div>
                                <div>
                                    <input type="text" placeholder='请输入密码' value={password} onChange={(e) => setPassword(e.target.value)} className='register-input'/>
                                </div>
                                <div>
                                    <input type="text" placeholder='请再次输入密码' value={checkPwd} onChange={(e) => setCheckPwd(e.target.value)} className='register-input'/>
                                </div>
                                <div className='login-checkbox'>
                                    <Checkbox>我已阅读并同意<span className='login-checkbox-link'>用户协议</span>、<span className='login-checkbox-link'>隐私政策</span>、<span className='login-checkbox-link'>产品服务协议</span></Checkbox>
                                </div>
                                <div>
                                    <button className="login-box-button" onClick={onRegister}>注册</button>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className='login-other'>登录视为您已同意第三方账号绑定协议、用户协议、隐私政策、产品服务协议</div>
            </div>
        </>
    )
}