import React, { Component } from 'react';
import { Calendar, Badge, Alert } from 'antd';
import { RESERVATION } from '../constants';
import {Reservation} from "./Reservation";
import moment from 'moment';

function getListData(value) {
    let listData;
    // console.log('value in switch:', value);
    switch (value.year()) {
        case 2020:
            switch (value.month()) {
                case 0:
                    switch (value.date()) {
                        case 1:
                            listData = [
                                    { content: 'should be 2020-02-1' },
                                ];
                            break;
                        case 2:

                        case 3:

                        case 12:

                        default:
                    }
                case 1:

                case 2:

                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                default:
            }
        default:
    }
    // switch (value.date()) {
    //     case 8:
    //         listData = [
    //             { content: 'This is warning event.' },
    //             { content: 'Tahis is usual event.' },
    //         ];
    //         console.log('listData: ', listData);
    //         break;
    //     case 10:
    //         listData = [
    //             { content: 'This is warning event.' },
    //             { content: 'This is usual event.' },
    //             { content: 'This is error event.' },
    //         ];
    //         break;
    //     case 15:
    //         listData = [
    //             { content: 'This is warning event' },
    //             { content: 'This is very long usual event。。....' },
    //             { content: 'This is error event 1.' },
    //             { content: 'This is error event 2.' },
    //             { content: 'This is error event 3.' },
    //             { content: 'This is error event 4.' },
    //         ];
    //         break;
    //     default:
    // }
    // switch (value.month().date()) {
    //     case 301:
    //         listData = [
    //                 { type: 'warning', content: 'This is warning event.' },
    //                 { type: 'success', content: 'This is usual event.' },
    //             ];
    //             break;
    //     case 2:
    //         listData = [
    //                 { type: 'warning', content: 'This is warning event.' },
    //                 { type: 'success', content: 'This is usual event.' },
    //                 { type: 'error', content: 'This is error event.' },
    //             ];
    //             break;
    // }
    return listData || [];
}

function setTime(value) {
    let time;
    time = moment.set('month', 3).set('date', 1).set('hour', 13).set('minute', 20);

    console.log('time:', time);
    return time;
}

function dateCellRender(value) {
    // console.log('value in dateCellRender: ', value.format('YYYY-MM-DD'));
    // Render reservation data here
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    {/*<div>*/}
                    {/*    Here is the reservation button*/}
                    {/*</div>*/}
                    {/*<Reservation/>*/}
                    {/*<Badge status={item.type} text={item.content}/>*/}


                        {item.content}

                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <div>
                Here is the month cell render
            </div>
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

function operation() {
    return (
        console.log('in operation function'),
        <Reservation/>
    );
}

//Calender is native and Calendar is imported from Antd
class Calender extends Component {

    constructor(props) {
        super(props)
        this.state = { info: [],
            value: moment(),
            selectedValue: moment(),
        }
    }

    onSelect = value => {
        console.log('In onSelect: ');
            console.log('In onSelect value: ', value);
        this.setState({
            value,
            selectedValue: value,
        });

    };

    getPost() {
        fetch(`${RESERVATION}/getAll`, {
            method: 'GET',
            headers: {
                // Accept: `*/*`,
                // Accept-Encoding: `gzip, deflate`,
                // Accept-Language: `en-US,en;q=0.9`,
                // Cache-Control: `max-age=0`,
                // Connection: `keep-alive`,
                // Host: `34.237.218.116:8080`,
                // Upgrade-Insecure-Requests: `1`,
                // User-Agent: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load comments.');
        }).then((data) => {
            let jsInfo = data
            console.log(jsInfo);
            console.log(jsInfo.startTime);
            this.setState({
                info: jsInfo
                // comments: data ? data : [],
            })
        }).catch((error) => {
            this.setState({
                errorMessage: error.message,
            })

        })
    }

    componentDidMount() {
        this.getPost();
    }

    render() {
        let info = this.state.info;
        const {selectedValue} = this.state;
        return (
            <div>
                {/*<Alert*/}
                {/*    message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}*/}
                {/*/>*/}
                <Reservation/>
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onSelect={this.onSelect}/>

                ,
                mountNode,
                ---fromDB---
                {info && info.map((item, index) => (
                    <li key={index.toString()}>{item.reservationId} {item.startTime} {item.endTime}</li>
                ))}
                ---fromDB---
            </div>
        );
    }
}

export default Calender;