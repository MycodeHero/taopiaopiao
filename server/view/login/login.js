require('./login.less')
import React from 'react'
import {render} from 'react-dom'
import { Layout } from 'antd'
const { Header, Footer, Content } = Layout
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Spin } from 'antd'
import { Select } from 'antd'
import ajax from 'common/ajax'
const IS_OK = "NO_ERR"
const Option = Select.Option;

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        ajax({
            url: "http://localhost:8080/access",
            method: "POST",
            data: values,
            flag: true
        }).then((data)=>{
            if(data.data.returnValue == IS_OK) {
              window.location.href = 'http://localhost:8080/app'
            }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{position:"relative"}}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <div className="login-btn">
            <Button
                type="primary"
                htmlType="submit"
                // disabled={hasErrors(getFieldsError())}
            >
                Log in
            </Button>
            <Button
                type="primary"
                htmlType="submit"
                // disabled={hasErrors(getFieldsError())}
            >
                Sign in
            </Button>
        </div>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

render(
    <div>
        <Header>
            <div className="logo"></div> 
            <p className="login-name">淘票票</p>
        </Header>
        <Content>
            <WrappedNormalLoginForm/>
        </Content>
        <Footer>
            <Spin size="large" />
            <p className="support">阿里云提供计算服务</p>
        </Footer>
    </div>,
    document.getElementById('login')
)