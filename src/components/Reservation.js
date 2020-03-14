import React from 'react';
import { Modal, Button, TimePicker, message, DatePicker } from 'antd';
import moment from 'moment';
import {ADD_RESERVATION} from '../constants';

const { RangePicker } = DatePicker;

export class Reservation extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        value: null,
        startYear: 0,
        startMonth: 0,
        startDate: 0,
        startHour: 0,
        startMinute: 0,
        endYear: 0,
        endMonth: 0,
        endDate: 0,
        endHour: 0,
        endMinute: 0,
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
        const test = {
            reservationId: '0',
            username: '0',
            studyRoomId: 'R1',
            startTime: `${this.state.startYear}${this.state.startMonth}${this.state.startDate}${this.state.startHour}${this.state.startMinute}`,
            endTime: `${this.state.endYear}${this.state.endMonth}${this.state.endDate}${this.state.endHour}${this.state.endMinute}`,
        }
        fetch(`${ADD_RESERVATION}`, {
            method: 'POST',
            // body: formData,
            // dataType: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(test),

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

    onChange = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);

        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        //From:  2020/03/10 19:01 , to:  2020/03/11 19:01
        // start time:
        console.log('From time year: ', dateStrings[0].slice(0, 4));
        console.log('From month: ', dateStrings[0].slice(5, 7));
        console.log('From date: ', dateStrings[0].slice(8, 10));
        console.log('From hour: ', dateStrings[0].slice(11, 13));
        console.log('From month: ', dateStrings[0].slice(14));
        // end time:
        console.log('From time year: ', dateStrings[1].slice(0, 4));
        console.log('From month: ', dateStrings[1].slice(5, 7));
        console.log('From date: ', dateStrings[1].slice(8, 10));
        console.log('From hour: ', dateStrings[1].slice(11, 13));
        console.log('From month: ', dateStrings[1].slice(14));

        this.setState({
            startYear: dateStrings[0].slice(0, 4),
            startMonth: dateStrings[0].slice(5, 7),
            startDate: dateStrings[0].slice(8, 10),
            startHour: dateStrings[0].slice(11, 13),
            startMinute: dateStrings[0].slice(14),
            endYear: dateStrings[1].slice(0, 4),
            endMonth: dateStrings[1].slice(5, 7),
            endDate: dateStrings[1].slice(8, 10),
            endHour: dateStrings[1].slice(11, 13),
            endMinute: dateStrings[1].slice(14),
        });
        console.log('Check state: ', this.state.endDate);
        const starttime = this.state.startYear + this.state.startMonth;
        console.log('Check startTime: ', starttime);
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading} = this.state;

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
                    <RangePicker
                        ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY/MM/DD HH:mm"
                        onChange={this.onChange}
                    />
                </Modal>
            </div>
        );
    }

}
