import React, {Component} from 'react'

class Circle extends Component {
    constructor(props){
        super(props)
        this.r = Math.random() * 150

        this.shape = {
            position: 'absolute',
            left: 0,
            top: 0,
            width: 2 * this.r,
            height: 2 * this.r,
            borderRadius: '50%',
            backgroundColor: props.color,
            opacity:0.5,
            transition: 'all 5s ease-in'
        }
        this.motion = this.motion.bind(this)
    }
    motion (ele, w, h) {
        let x = Math.random() * w
        let y = Math.random() * h
        ele.style.left = x + 'px'
        ele.style.top = y + 'px'
    }
    componentDidMount(){
        let circle = this.refs.circle
        let parent = circle.parentNode
        let w = parent.offsetWidth
        let h = parent.offsetHeight
        setInterval(()=>{
            this.motion(circle, w, h)
        },5000)
    }
    render() {
        return (
            <div ref="circle" style={this.shape}></div>
        )
    }
}
module.exports = Circle