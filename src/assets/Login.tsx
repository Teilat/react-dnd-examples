import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import {Button, Checkbox, Form, Input} from "antd";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        credentials: "include",
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials.values)
    })
        .then(async request => {
            return await request.text()
        })
}

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState<string>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (Cookies.get("token") != undefined) {
            navigate("/taskboard", {replace: true})
        } else {
            setLoggedIn(false)
        }
    }, [loggedIn])

    const onFinish = async (values: any) => {
        const err = await loginUser({
            values
        });
        if (err != undefined) {
            setLoggedIn(true)
            navigate("/taskboard", {replace: true})
        } else {
            setLoggedIn(false)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-warp">
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>)
}