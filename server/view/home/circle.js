import React, {Component} from 'react'

class Circle extends Component {
    constructor(props){
        super(props)
        this.r = (Math.random() + 1) * 60

        this.shape = {
            position: 'absolute',
            left: 0,
            top: 0,
            width: 2 * this.r,
            height: 2 * this.r,
            borderRadius: '50%',
            opacity: 0.8,
            backgroundColor: props.color,
            transition: 'all 5s ease-in-out',
            transform: '-webkit-translate3d(0,0,0)'
        }
        this.motion = this.motion.bind(this)
    }
    motion (ele, w, h) {
        let r = this.r
        let x = Math.random() * (w - 2 * r)
        let y = Math.random() * (h - 2 * r)
        ele.style.left = x + 'px'
        ele.style.top = y + 'px'
    }
    componentDidMount(){
        let circle = this.refs.circle
        let parent = circle.parentNode
        let w = window.innerWidth
        let h = window.innerHeight - 45
        setInterval(()=>{
            this.motion(circle, w, h)
        },5000)
    }
    render() {
        return (
            <div ref="circle" style={this.shape}>
                <i style={{display:"inline-block", width: '100%', height:'100%', borderRadius: '50%', background: '-webkit-radial-gradient(20px 20px, circle, rgba(255,255,255,0.8), rgba(255,255,255,0.3))'}}></i>
            </div>
        )
    }
}
module.exports = Circle