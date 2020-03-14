import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import Discussion from "./Discussion";
import Calendar from "./Calender";
import Post from "./Post";
import Discussionlogo from '../assets/images/discussion.svg';
import Reservationlogo from '../assets/images/reservation.svg';


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
                    <div className="dashboradmain">
                        <div className="dashboradright">
                            <h2 className="dashboradtitle">welcome back!</h2>
                            <h4>________________________________________________________________________________</h4>
                            <div>
                                <Button type="default" size="large" onClick={() => this.changeTab("2")}>
                                    <img src={Discussionlogo} />
                                    <li>Discussion</li>
                                </Button>
                                <Button type="default" size="large" onClick={() => this.changeTab("3")}>
                                    <img src={Reservationlogo} />
                                    <li>Reservation</li>
                                </Button>
                            </div>
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