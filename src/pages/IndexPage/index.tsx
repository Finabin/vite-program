import React from "react";

import MyDrag from "../../components/MyDrag";
import { Button } from "antd";
import { LogOut } from "../../apis/login";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function IndexPage() {

  const navigator = useNavigate()

  const logout = async () => {
    const data = {
      satoken: Cookies.get("satoken")
    }
    const result = await LogOut(data)
    if(result.status === 200) {
      Cookies.remove("satoken")
      navigator('/')
    }
  }

  return (
    <div>
      <MyDrag />
      <div>
        <Button type="primary" onClick={logout}>退出登陆</Button>
      </div>
    </div>
  );
}