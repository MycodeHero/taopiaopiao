require('./Tooltip.less')
import React from 'react'
function Tooltip(props) {
    return (
        <div className="tool-tip" style={props.isShow ? {display: "block"} : {display: "none"}}>
            <div className="wait"></div>
        </div>
    )
}

module.exports = Tooltip