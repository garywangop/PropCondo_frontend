import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { REGISTER } from "../constants";

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        fetch(`${REGISTER}/${values.username}`, {
          method: "GET"
        })
          .then(
            response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Fail to login");
            },
            error => {
              console.log("Error", error);
            }
          )
          .then(text => {
            console.log(text);
            if (text.password === values.password) {
              console.log("Able to login");
              message.success("Login success!");
              // this.props.history.push('./dashboard');
              this.props.handleLogin();
            } else {
              message.error("Login error, please login again!");
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login-form'>
        <h1 className='login-text'>User Log In</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(NormalLoginForm);

export default Login;
