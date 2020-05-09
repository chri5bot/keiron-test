import React from 'react'
import { useFormInput } from '../../hooks'
import { Form, Input, Button, Card } from 'antd';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from 'query-string'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 30 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 30 },
};

function SignUp({ history, location }) {
    const username = useFormInput('')
    const password = useFormInput('')
    const repeatPassword = useFormInput('')
    const email = useFormInput('')

    const onFinish = values => {

        const { username, password, email } = values
        axios.post('http://localhost:4000/signup', { username, password, email })
            .then(res => {
                const { status } = res
                if (status === 201) {
                    const { r } = queryString.parse(location.search)

                    if (r && typeof r === 'string') {
                        history.replace(r)
                    } else {
                        history.replace('/login')
                    }
                }
            })
            .catch(() => {
                console.log('something is wrong')
            })
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Wrapper>
            <Card style={{ width: 900 }}>
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
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input {...email} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password {...password} />
                    </Form.Item>

                    <Form.Item
                        label="Repeat Password"
                        name="repeatPassword"
                        rules={[{ required: true, message: 'Please repeat your password!' }]}
                    >
                        <Input.Password {...repeatPassword} />
                    </Form.Item>

                    <Form.Item  {...tailLayout}>
                        <Link to="/login">Log In</Link>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" disabled={!username.value || !email.value || !password.value || (password.value !== repeatPassword.value)}>
                            Submit
                </Button>
                    </Form.Item>

                </Form>
            </Card>
        </Wrapper>
    )
}

export default SignUp