import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const buttonText = 'Sign up';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('onChange: ', event.target);
        console.log(`name: ${event.target.name}, value: ${event.target.value}`);
        this.setState({[event.target.name]: event.target.value});
    }

    onFinish = values => {
        console.log('onFinish: ', values);
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                style={{
                    width: '30%',
                    margin: 'auto'
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        style={{
                            width: '100%'
                        }}
                    >
                        {buttonText}
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

export default SignupForm;