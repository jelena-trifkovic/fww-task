import React from 'react';
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
import axiosInstance from '../api/auth';

const { Text } = Typography;

class Scheduler extends React.Component {

    state = {
        value: moment(),
        selectedValue: moment(),
        events: this.props.events,
        selected: false,
        editDeleteEvent: false,
        createEvent: false,
        userId: 0,
        deleteEventId: 0
    };

    componentDidMount() {
        axiosInstance.get(
            `http://127.0.0.1:8000/api/users/${this.props.username}`
            , {
                headers: {
                  'Authorization': `JWT ${localStorage.getItem('access_token')}` 
                }
              })
            .then(res => {
                console.log(res);
                this.setState({ userId: res.data.id });
        }).catch(err => { console.log(err); });
    }
    
    dateCellRender = value => {
        const { events } = this.state;
        console.log(events);
        let event = events.find(elem => elem.date == value.format('YYYY-MM-DD'));
        if (event) {
            return (
                <Badge status={'success'} text={event?.name} />
            );
        }
    }

    onSelect = value => {
        console.log(`onSelect -> ${value.format('YYYY-MM-DD')}`);
        this.setState({
            value,
            selectedValue: value,
            selected: true
        });

        const { events } = this.state;
        console.log(events);
        let event = events.find(elem => elem.date == value.format('YYYY-MM-DD'));
        if (event) {
            this.setState({
                createEvent: false,
                editDeleteEvent: true
            });
        } else {
            this.setState({
                createEvent: true,
                editDeleteEvent: false
            });
        }
    };

    onPanelChange = value => {
        console.log(`onPanelChange -> ${value.format('YYYY-MM-DD')}`);
        this.setState({
            value
        });
    };

    onFinishCreate = values => {
        console.log('Received values of form: ', values);

        axiosInstance.post(
            `http://127.0.0.1:8000/api/event/create/`,
            {
                name: values.eventName,
                date: this.state.selectedValue.format('YYYY-MM-DD'),
                user: this.state.userId
            },
            {
                headers: {
                  'Authorization': `JWT ${localStorage.getItem('access_token')}` 
                }
            })
            .then(res => {
                console.log(res);
                this.setState({ 
                    events: this.state.events.concat([ res.data ]),
                    createEvent: false,
                    editDeleteEvent: true
                });
        }).catch(err => { console.log(err); });
    };

    onFinishEdit = values => {
        console.log('Received values of form: ', values);
        let event = this.state.events.find(elem => elem.date == this.state.selectedValue.format('YYYY-MM-DD'));

        axiosInstance.put(
            `http://127.0.0.1:8000/api/event/edit/${event.id}`,
            {
                name: values.eventName,
                date: this.state.selectedValue.format('YYYY-MM-DD'),
                user: this.state.userId
            },
            {
                headers: {
                  'Authorization': `JWT ${localStorage.getItem('access_token')}` 
                }
            })
            .then(res => {
                console.log(res);
                this.setState({ 
                    events: this.state.events.map(elem => {
                        if (elem.id == res.data.id) 
                            return res.data;
                        else return elem;
                    })
                });
        }).catch(err => { console.log(err); });
    };

    onFinishDelete = values => {
        console.log('Received values of form: ', values);
        let event = this.state.events.find(elem => elem.date == this.state.selectedValue.format('YYYY-MM-DD'));

        this.setState({ 
            deleteEventId: event.id
        });

        axiosInstance.delete(
            `http://127.0.0.1:8000/api/event/delete/${event.id}`,
            {
                headers: {
                  'Authorization': `JWT ${localStorage.getItem('access_token')}` 
                }
            })
            .then(res => {
                console.log('delete');
                this.setState({ 
                    events: this.state.events.filter(elem => {
                        if (elem.id != this.state.deleteEventId) 
                            return true;
                        else return false;
                    }),
                    createEvent: true,
                    editDeleteEvent: false
                });
        }).catch(err => { console.log(err); });
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
                }} />;
        } else {
            alert = '';
        }

        let createForm;
        if (createEvent) {
            createForm = <Card style={{ width: "60%", margin: "auto", marginTop: "2vh" }}>
                <Space direction="vertical">
                    <Text type="primary">Do you want to create the event?</Text>
                    <Form initialValues={{ remember: true }}
                        onFinish={this.onFinishCreate}
                    >
                        <Form.Item
                            name="eventName"
                            rules={[{ required: true, message: 'Please input your event name!' }]}
                        >
                            <Input placeholder="Event name" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Create</Button>
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
                        onFinish={this.onFinishEdit}
                    >
                        <Form.Item
                            name="eventName"
                            rules={[{ required: true, message: 'Please input your event name!' }]}
                        >
                            <Input placeholder="Event name" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Edit</Button>
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
                            <Text type="danger">Do you want to delete the event?</Text>
                        <Form initialValues={{ remember: true }}
                            onFinish={this.onFinishDelete}
                        >
                        <Form.Item>
                            <Button type="primary" htmlType="submit" danger>Delete</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>;
        } else {
            deleteForm = '';
        }

        return (
            <div>
                {alert}
                {createForm}
                {editForm}
                {deleteForm}
                <Calendar onPanelChange={this.onPanelChange}
                    dateCellRender={this.dateCellRender}
                    value={value}
                    onSelect={this.onSelect}
                    style={{
                        width: "60%",
                        margin: "auto"
                    }}
                />
            </div>
        );
    }
}

export default Scheduler;