import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Scheduler from './Scheduler';

const buttonText = 'Sign in';

class SigninForm extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", isLoggedIn: false, events: [] };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('onChange: ', event.target);
        console.log(`name: ${event.target.name}, value: ${event.target.value}`);
        this.setState({ [event.target.name]: event.target.value });
    }

    onFinish = values => {
        console.log('onFinish: ', values);
        axios.post(
            'http://127.0.0.1:8000/api/token/obtain/',
            {
                username: this.state.username,
                password: this.state.password
            }
        )
            .then(res => {
                console.log(res);
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axios.get(
                    `http://127.0.0.1:8000/api/events/${this.state.username}`
                    , {
                        headers: {
                          'Authorization': `JWT ${localStorage.getItem('access_token')}` 
                        }
                      })
                    .then(res => {
                        console.log(res);
                        this.setState({ 'events' : res.data});
                        this.setState({ 'isLoggedIn' : true});
                    })
                .catch(err => { console.log(err); });
            })
            .catch(err => console.log(err));
    }

    render() {
        let { isLoggedIn } = this.state;
        let body;

        if (!isLoggedIn) {
            body = (
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
                </Form>);
        } else {
            body = (<Scheduler events={this.state.events} username={this.state.username}/>);
        }

        return (
            <div>
                {body}
            </div>
        );
    }
};

export default SigninForm;