import React from 'react'
import {render} from 'react-dom'
import { Row, Col } from 'antd';
require('./login.less')

render(
  <div>
    <Row>
      <Col span={6}>后台管理系统</Col>
    </Row>
  </div>,
  document.getElementById('app')
);