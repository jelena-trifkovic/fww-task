import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

class TabNavigator extends React.Component {
    state = {
        current: this.props.currentMenu
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="signin">
                    <Link to="/signin/">
                        Sign in
                    </Link>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link to="/signup/">
                        Sign up
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default TabNavigator;