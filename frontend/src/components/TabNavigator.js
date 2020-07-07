import React from 'react';
import { Tabs } from 'antd';
import LoginForm from './LoginForm';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const TabNavigator = () => (
    <Tabs defaultActiveKey="1" onChange={callback} centered>
        <TabPane tab="Sign in" key="1">
            <LoginForm buttonText="Sign in" />
        </TabPane>
        <TabPane tab="Sign up" key="2">
            <LoginForm buttonText="Sign up" />
        </TabPane>
    </Tabs>
);

export default TabNavigator;