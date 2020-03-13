import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import Discussion from "./Discussion";
import Calendar from "./Calender";
import Post from "./Post";

const { TabPane } = Tabs;

const operations = <Button>Hello xxx</Button>;

class DashBoard extends Component {

    state = {
        activeTab: "1"
    };

    changeTab = activeKey => {
        console.log(activeKey);
        this.setState({
            activeTab: activeKey
        });
    };


    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs"
                activeKey={this.state.activeTab} onChange={this.changeTab}>
                <TabPane tab="Home" key="1">
                    <div>
                        welcome back!
                        <div>
                            <Button type="default" size="large" onClick={() => this.changeTab("2")}>
                                Discussion
                            </Button>
                            <Button type="default" size="large" onClick={() => this.changeTab("3")}>
                                Reservation
                            </Button>
                        </div>
                    </div>

                </TabPane>
                <TabPane tab="Discussion" key="2">
                    <Discussion />
                </TabPane>
                <TabPane tab="Reservation" key="3">
                    <Calendar />
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