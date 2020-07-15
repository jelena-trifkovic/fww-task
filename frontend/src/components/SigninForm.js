import React, { Component } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import TabNavigator from './TabNavigator';
import axiosInstance from '../api/auth';
import Scheduler from './Scheduler';

const buttonText = 'Sign in';

class SigninForm extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", events: [], isLoggedIn: false, loginError: false };
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
                axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.get(
                    `/events/${this.state.username}`
                ).then(res => {
                    console.log(res);
                    this.setState({ events: res.data, isLoggedIn: true, loginError: false });
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoggedIn: false, loginError: true });
            });
    }

    render() {
        const { isLoggedIn, loginError } = this.state;

        let alert;
        if (loginError) {
            alert = <Alert
                message={"Failed login!"}
                type="error"
                style={{
                    margin: "auto",
                    width: '30%',
                    marginTop: '2vh'
                }} />;
        } else {
            alert = '';
        }

        const logOut = () => {
            this.setState({isLoggedIn: false});
        };

        let body;
        let menu;
        if (!isLoggedIn) {
            menu = <TabNavigator currentMenu="signin" isLoggedIn={isLoggedIn} logOut={logOut} />;
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
                        margin: 'auto',
                        marginTop: '2vh'
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
            menu = (<TabNavigator currentMenu="calendar" isLoggedIn={isLoggedIn} logOut={logOut} />);
            body = (<Scheduler events={this.state.events} username={this.state.username} />);
        }

        return (
            <div>
                {menu}
                <div>
                    {alert}
                    {body}
                </div>
            </div>
        );
    }
};

export default SigninForm;