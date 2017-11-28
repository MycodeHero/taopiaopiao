require('./SlideBlock.less')
import React from 'react'

export default function SlideBlock (props) {
    console.log(props.index)
    let l = (1 / 6 + ((1 / 6) * props.index * 2)) * 100 + '%'
    return (
        <div className="slide-path" >
            <i style={{left: l}}></i>
        </div>
    )
}