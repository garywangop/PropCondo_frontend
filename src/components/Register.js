import React, {Component} from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Button,
    message,
} from 'antd';
import {REGISTER} from '../constants';

const { Option } = Select;

const residences = [
    {
        value: 'Place1',
        label: 'A',
        children: [
            {
                value: 'A1',
                label: '001',
            },
            {
                value: 'A2',
                label: '002',
            },
            {
                value: 'A3',
                label: '003',
            },
        ],
    },
    {
        value: 'Place2',
        label: 'B',
        children: [
            {
                value: 'B1',
                label: '001',
            },
            {
                value: 'B2',
                label: '002',
            },
            {
                value: 'B3',
                label: '003',
            },
            {
                value: 'B4',
                label: '004',
            },
        ],
    },
    {
        value: 'Place3',
        label: 'C',
        children: [
            {
                value: 'C1',
                label: '001',
            },
            {
                value: 'C2',
                label: '002',
            },
            {
                value: 'C3',
                label: '003',
            },
            {
                value: 'C4',
                label: '004',
            },
            {
                value: 'C5',
                label: '005',
            },
        ],
    },
];

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        let lastResponse;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${REGISTER}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        user_id: 0,
                        username: values.username,
                        password: values.password,
                        roomId: values.roomId[1],
                        email: values.email,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        admin: false,
                    }),
                }).then((response) => {
                    lastResponse = response;
                    return response.text();
                }, (error) => {
                    console.log('Error' + error);
                }).then((text) => {
                    if (lastResponse.ok) {
                        message.success(text);
                        this.props.history.push('/dashboard');
                    } else {
                        message.error(text);
                    }
                });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="Apartment Number">
                    {getFieldDecorator('roomId', {
                        // initialValue: ['Place1', 'Place2', 'Place3'],
                        rules: [
                            { type: 'array', required: true, message: 'Please select your habitual residence!' },
                        ],
                    })(<Cascader options={residences} />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="First Name">
                    {getFieldDecorator('firstName', {
                        rules: [{required: true, message: 'Please input your first name!'}]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Last Name">
                    {getFieldDecorator('lastName', {
                        rules: [{required: true, message: 'Please input your first name!'}]
                    })(<Input />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;