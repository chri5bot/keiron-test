import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import styled from 'styled-components'
import { useFormInput } from '../../hooks'
import axios from "axios";
import queryString from 'query-string'
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

function Login({ history, location }) {
    const username = useFormInput('')
    const password = useFormInput('')
    const onFinish = values => {
        console.log('Success:', values);
        const { username, password } = values
        axios.post('http://localhost:4000/login', { username, password })
            .then(res => {
                const { status } = res
                if (status === 200) {
                    window.sessionStorage.setItem('token', JSON.stringify(res.data.user))

                    const { r } = queryString.parse(location.search)

                    if (r && typeof r === 'string') {
                        history.replace(r)
                    } else {
                        history.replace('/')
                    }
                }
            })
            .catch(() => {
                console.log('something is wrong')
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Wrapper>
            <Card style={{ width: 600 }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input {...username} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password {...password} />
                    </Form.Item>

                    <Form.Item  {...tailLayout}>
                        <Link to="/sign-up">Sign Up</Link>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" disabled={!username.value || !password.value}>
                            Submit
                    </Button>
                    </Form.Item>

                </Form>
            </Card>
        </Wrapper>
    );
}

export default Login