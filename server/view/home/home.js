require('./home.less')
import React from 'react'
import {render} from 'react-dom'
import { Row, Col } from 'antd';
import Circle from './circle'

render(
  <div style={{overflow: "hidden", height: "100%"}}>
    <div className="top-head">
      <Row>
        <img className="logo" src="https://h5.m.taopiaopiao.com/app/movie/pages/index/favicon.ico"/>
        <Col span={6}>后台管理系统</Col>
      </Row>
    </div>
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <Circle color='red'/>
      <Circle color='green'/>
      <Circle color='blue'/>
      <Circle color='orange'/>
      <Circle color='yellow'/>
      <Circle color='cyan'/>
      <Circle color='purple'/>
    </div>
  </div>,
  document.getElementById('app')
);