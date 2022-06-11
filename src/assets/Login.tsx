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
        body: JSON.stringify(credentials)
    })
        .then(async request => await request.text())
}

export default function Login() {
    const navigate = useNavigate()
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        let a = Cookies.get('token')
        if (a != undefined) {
            navigate("/taskboard", {replace: true})
        }
    }, [loggedIn])

    const handleSubmit = async e => {
        e.preventDefault();
        const err = await loginUser({
            username,
            password
        });
        if (err != undefined) {
            setLoggedIn(true)
            navigate("/taskboard", {replace: true})
        } else {
            setLoggedIn(false)
        }
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 4}}
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