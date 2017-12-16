require('./login.less')
import React from 'react'
import {render} from 'react-dom'
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Spin } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
          <div style={{position:"absolute", top: 1, right: 1, zIndex: 999}}>
            <Select defaultValue="个人" style={{ width: '5rem' }} onChange={handleChange}>
                <Option value="person">个人</Option>
                <Option value="compus">企业</Option>
            </Select>
          </div>
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