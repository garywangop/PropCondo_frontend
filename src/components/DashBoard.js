import React, {Component} from 'react';
import { Tabs, Button } from 'antd';
import Discussion from "./Discussion";
import Calendar from "./Calender";

const { TabPane } = Tabs;

const operations = <Button>Hello xxx</Button>;

class DashBoard extends Component {
    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Home" key="1">
                    Content of tab 1
                </TabPane>
                <TabPane tab="Discussion" key="2">
                    <Discussion/>
                </TabPane>
                <TabPane tab="Reservation" key="3">
                    <Calendar/>
                </TabPane>
                <TabPane tab="Documents" key="4">
                    Content of tab 4
                </TabPane>
            </Tabs>
        );
    }
}

export default DashBoard;