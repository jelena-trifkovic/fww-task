import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const centerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
};

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
        const { isLoggedIn } = this.props;
        let menubar;
        if (isLoggedIn) {
            menubar = (
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={centerStyle}>
                <Menu.Item key="calendar">
                            <Link to="/signin/">
                                Calendar
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="logout">
                            <Link to="/signin/">
                                Log out
                            </Link>
                    </Menu.Item>
                </Menu>
                ); 
        } else {
            menubar = (
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={centerStyle}>
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
        return (
            <div>
                { menubar }
            </div>
        );
    }
}

export default TabNavigator;