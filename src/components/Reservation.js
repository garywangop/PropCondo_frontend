import React from 'react';
import { Modal, Button, TimePicker, message } from 'antd';
import moment from 'moment';
import {ADD_RESERVATION} from '../constants';

// function onChange(time, timeString) {
//     console.log(time, timeString);
//     console.log('moment(time): ',moment(time));
//     console.log('moment(timeString): ', moment(timeString));
// }

export class Reservation extends React.Component {


    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        startHour: 0,
        StartMinute: 0,
        endHour: 0,
        endMinute: 0,
        value: null,
        startTime: false,
        endTime: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            // confirmLoading: true,
            visible: false,
        });
        const formData = new FormData();
        formData.append('reservationId', '0');
        formData.append('username', 'gary');
        formData.append('studyRoomId', 'R1');
        formData.append('startTime', `${this.startHour}${this.StartMinute}`);
        formData.append('endTime', `${this.endHour}${this.endMinute}`);
        const test = {
            reservationId: '0',
            username: '0',
            studyRoomId: 'R1',
            startTime: '123456789',
            endTime: '234567890'
        }
        fetch(`${ADD_RESERVATION}`, {
            method: 'POST',
            // body: formData,
            // dataType: 'application/json',
            headers: {
                'Content-Type': 'application/json'
                // Accept: `*/*`,
                // Accept-Encoding: `gzip, deflate`,
                // Accept-Language: `en-US,en;q=0.9`,
                // Cache-Control: `max-age=0`,
                // Connection: `keep-alive`,
                // Host: `34.237.218.116:8080`,
                // Upgrade-Insecure-Requests: `1`,
                // User-Agent: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36`,
            },
            body: JSON.stringify(formData),

        }).then((response) => {
            if (response.ok) {
                message.success('Add reservation succeed!');
                // this.form.resetFields();
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
                if (this.props.onSuccess) {
                    this.props.onSuccess();
                }
            } else {
                message.error('Add reservation failed.');
                this.setState({
                    confirmLoading: false,
                });
            }
        })
    };

    onChange = (time, timeString) => {
        console.log('time: ', time);
        console.log('timeString: ', JSON.stringify(timeString));
        //Get hour
        console.log('timeString: ', JSON.stringify(timeString).slice(1,3));
        // Get Minute
        console.log('timeString: ', JSON.stringify(timeString).slice(4,6));
        // this.setState({ value: timeString });
        // console.log('value is: ', this.state.value);
        if (this.startTime === true) {
            this.setState({
                startHour: JSON.stringify(timeString).slice(1,3),
                startMinute: JSON.stringify(timeString).slice(4,6),
                startTime: false,
            });
            console.log('In startTime');

        } else if (this.endTime === true) {
            this.setState({
                startHour: JSON.stringify(timeString).slice(1,3),
                startMinute: JSON.stringify(timeString).slice(4,6),
                endTime: false,
            });
            console.log('In endTime');
        } else {
            console.log('nothing happened');
        }

    }

    startChange = () => {
        console.log('in start change now');
        this.setState({
            startTime: true,
        });

    }

    endChange = () => {
        console.log('in end change now');
        this.setState({
            endTime: true,
        });

    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Make a Reservation
                </Button>
                <Modal
                    title="Make a reservation"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="Submit"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >

                    <li>
                        <ul>
                            <li>From： <TimePicker use24Hours format="hh:mm" startChange={this.startChange} onChange={this.onChange} value={this.state.value}/></li>
                        </ul>
                        <ul>
                            <li>To： <TimePicker use24Hours format="hh:mm" endChange={this.endChange} onChange={this.onChange}/></li>
                        </ul>
                    </li>

                </Modal>
            </div>
        );
    }

}
