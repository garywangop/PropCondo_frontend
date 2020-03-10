import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import { RESERVATION } from '../constants';

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
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
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

//Calender is native and Calendar is imported from Antd
class Calender extends Component {

    constructor(props) {
        super(props)
        this.state = { info: [] }
    }

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
        return (
            <div>
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />,
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