import React from 'react';
import { Tabs } from 'antd';
import { Calendar } from 'antd';
import { Badge } from 'antd';
import { Alert } from 'antd';
import { Button } from 'antd';
import moment from 'moment';

const logOutButton = <Button style={{ margin: "auto" }}>Log out</Button>;

function getDayData(value) {
    console.log(value);
    let event;

    const day = value.date();
    const month = value.month();
    const year = value.year();

    console.log(day);
    console.log(month);
    console.log(year);

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

function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}

function callback(key) {
    console.log(key);
}

class Scheduler extends React.Component {

    state = {
        value: moment(),
        selectedValue: moment(),
    };

    onSelect = value => {
        this.setState({
            value,
            selectedValue: value,
        });
    };

    onPanelChange = value => {
        this.setState({ value });
    };

    render() {
        const { value, selectedValue } = this.state;
        return (
            <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={logOutButton} centered>
                <TabPane tab="Calendar" key="1">
                    <Alert
                        message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
                        style={{
                            width: "60%",
                            margin: "auto"
                        }}
                    />
                    <Calendar onPanelChange={onPanelChange}
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