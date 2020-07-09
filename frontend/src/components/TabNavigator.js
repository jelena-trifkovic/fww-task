import React from 'react';
import { Tabs } from 'antd';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const TabNavigator = () => (
    <div>
        <Tabs defaultActiveKey="1" onChange={callback} centered>
            <TabPane tab="Sign in" key="1">
                <SigninForm />
            </TabPane>
            <TabPane tab="Sign up" key="2">
                <SignupForm />
            </TabPane>
        </Tabs>
    </div>
);

export default TabNavigator;