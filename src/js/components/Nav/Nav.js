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
        <Router>
            <div className="top-nav">
                <ul>
                    {row}
                </ul>
                {props.children}
            </div>
        </Router>
    )
}
module.exports = Nav