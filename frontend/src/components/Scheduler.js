import React from 'react';
import { Tabs } from 'antd';
import { Calendar } from 'antd';
import { Badge } from 'antd';
import { Alert } from 'antd';
import { Button } from 'antd';
import { Space } from 'antd';
import { Typography } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Input } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const logOutButton = <Button style={{ marginRight: "2vw" }}>Log out</Button>;

function getDayData(value) {
    //console.log(value);
    let event;

    const day = value.date();
    const month = value.month();
    const year = value.year();

    //console.log(day);
    //console.log(month);
    //console.log(year);

    // ENDPOINT 2 - DISPLAY EVENT PER DAY
    switch (day) {
        case 8:
            event = { type: 'success', content: 'Event 1' };
            break;
        case 10:
            event = { type: 'success', content: 'Event 2' };
            break;
        case 15:
            event = { type: 'success', content: 'Event 3' };
            break;
        default:
    }
    return event || {};
}

function dateCellRender(value) {
    const event = getDayData(value);
    return (
        <Badge status={event.type} text={event.content} />
    );
}

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class Scheduler extends React.Component {

    state = {
        value: moment(),
        selectedValue: moment(),
        selected: false,
        editDeleteEvent: false,
        createEvent: false
    };

    onSelect = value => {
        console.log(`onSelect -> ${value.format('YYYY-MM-DD')}`);
        this.setState({
            value,
            selectedValue: value,
            selected: true
        });

        // ENDPOINT 2 - CREATE/EDIT/DELETE
    };

    onPanelChange = value => {
        console.log(`onPanelChange -> ${value.format('YYYY-MM-DD')}`);
        this.setState({ 
            value
        });
    };

    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    render() {
        const { value, selectedValue, selected, editDeleteEvent, createEvent } = this.state;

        let alert;
        if (selected) {
            alert = <Alert
                message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
                style={{
                    width: "60%",
                    margin: "auto"
            }}/>;
        } else {
            alert = '';
        }

        let createForm;
        if (createEvent) {
            createForm = <Card style={{ width: "60%", margin: "auto", marginTop: "2vh" }}>
                <Space direction="vertical">
                <Text type="primary">Do you want to create the event?</Text>
                <Form initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="eventName"
                        rules={[{ required: true, message: 'Please input your event name!' }]}
                    >
                        <Input placeholder="Event name" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Create</Button>
                    </Form.Item>
                </Form>
            </Space>
            </Card>;
        } else {
            createForm = '';
        }

        let editForm;
        if (editDeleteEvent) {
            editForm = <Card style={{ width: "60%", margin: "auto", marginTop: "2vh" }}>
                <Space direction="vertical">
                <Text type="primary">Do you want to edit the event?</Text>
                <Form initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="eventName"
                        rules={[{ required: true, message: 'Please input your event name!' }]}
                    >
                        <Input placeholder="Event name" />
                    </Form.Item>
                    <Form.Item>
                        <Button>Edit</Button>
                    </Form.Item>
                </Form>
            </Space>
            </Card>;
        } else {
            editForm = '';
        }

        let deleteForm;
        if (editDeleteEvent) {
            deleteForm = <Card style={{ width: "60%", margin: "auto", marginTop: "2vh" }}>
                <Space direction="vertical">
                <Text type="danger">Do you want to delete event?</Text>
                <Button type="primary" danger>Delete</Button>
            </Space>
            </Card>;
        } else {
            deleteForm = '';
        }

        return (
            <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={logOutButton} centered>
                <TabPane tab="Calendar" key="1">
                    { alert }
                    { createForm }
                    { editForm }
                    { deleteForm }
                    <Calendar onPanelChange={this.onPanelChange}
                        dateCellRender={dateCellRender}
                        value={value}
                        onSelect={this.onSelect}
                        style={{
                            width: "60%",
                            margin: "auto"
                        }}
                    />
                </TabPane>
            </Tabs>
        );
    }
}

export default Scheduler;