require('./Nav.less')
import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const Nav = (props) => {
    let row = []
    let list = props.list
    list.map((item, index)=>{
        row.push(<li key={index} onTouchEnd={props.changeIndex.bind(null, index)} className={index == props.index ? 'active' : ''}>
                    <Link to={item.route}>{item.content}</Link>
                </li>)
        })
    return (
        <Router basename="/">
            <div className="top-nav" style={props.status == 0? {top: 0}: {}}>
                <ul>
                    {row}
                </ul>
                {props.children}
            </div>
        </Router>
    )
}
module.exports = Nav