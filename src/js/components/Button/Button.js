require('./Button.less')
import React from 'react'
const Button = (props) => {
    return (
        <div className= {props.type === 'NORMAL'? 'item-button button-red' : 'item-button button-blue'}>
            <p>{props.type === 'NORMAL'? '购票': '预售'}</p>
        </div>
    )
}
module.exports = Button