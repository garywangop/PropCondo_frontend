import React, {Component} from 'react';
import { Tabs, Button } from 'antd';
import Discussion from "./Discussion";
import Calendar from "./Calender";
import Post from "./Post";

const { TabPane } = Tabs;

const operations = <Button>Hello xxx</Button>;

class DashBoard extends Component {
    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Home" key="1">
                    Notice section and user function bar in this tab
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
                <TabPane tab="Community" key="5">
                    <Post />
                </TabPane>
            </Tabs>
        );
    }
}

export default DashBoard;