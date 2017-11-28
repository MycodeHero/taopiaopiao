require('./SlideShow.less')
import React, {Component} from 'react'
import $ from 'common/common'

class SlideShow extends Component {
    constructor(props) {
        super(props)
        this.handleDom = null
        this.timer = null
        this._isMounted = true //应为回调函数执行，可能回组件已经被卸载 不能使用setState方法 所以会产生warning警告 为了避免这个结果而设计的变量
        this.state = {curIndex: props.index || 0}
        this.interval = setInterval.bind(null, this.beginScroll.bind(this), this.props.timer)
        this.createPoint = this.createPoint.bind(this)
        this.handleData = this.handleData.bind(this)
    }
    //滚动事件
    beginScroll (curI) {
        if(!this._isMounted) {
            return 
        }
        let curIndex = curI ? curI + 1 : this.state.curIndex + 1
        this.handleDom.css({transition:"left 1s ease-in-out", left: - (this.state.curIndex * this.distant) + 'px'}) 
        this.setState({
            curIndex
        })
    }
    //绑定事件
    boundEvent (boundDom) {
        let _self = this
        boundDom.ontouchstart = function (e) {
            clearInterval(_self.timer)
            let once = true
            var ipos = e.touches[0].pageX
            this.ontouchmove = function (e) {
                var cpos = e.touches[0].pageX
                if(cpos - ipos < -20) {
                    if(once) {
                        _self.beginScroll()
                        once = false
                    }
                } 
                
            }
            this.ontouchend = function (e) {
                _self.timer = _self.interval()
            }
        }
    }
    createPoint () {
        let pointArr = []
        for(let i = 0; i < 5; i++) {
            pointArr.push()
        }
        this.points = pointArr
    }
    handleData (data = []) {
        if(data.length == 0){
            return
        }
        let row = []
        // this.pointLength = data.length
        let itemList = ([]).concat(data)
        itemList.push(itemList[0])
        itemList.forEach((item, index)=>{
            row.push(<li key={index}><img src={'https://gw.alicdn.com/' + item.bigPicUrl}/></li>)
        }) 
        return row
    }
    componentWillMount () {
        this._isMounted = true
        this.distant = window.innerWidth
        this.handleData()
        this.createPoint()

    }
    componentDidMount () {
        this.handleDom = $('scroll-wrapper')
        this.timer = this.interval()
        this.boundEvent(this.handleDom[0])
    }
    componentWillUnmount () {
        this._isMounted = false
        clearInterval(this.timer)
    }
    componentDidUpdate () {
        if(this.state.curIndex == 6) {
            this.handleDom.css({transition: 'left 0s ease-in-out', left: '0px'})
            this.setState({
                curIndex: 0
            })
        }
    }
    render() {
        return (
            <div className="slideshow">
                <ul className='scroll-wrapper' style={{transition:"left 1s ease-in-out", left: - (this.state.curIndex * this.distant) + 'px'}}>
                    {this.handleData(this.props.item)}
                </ul>
                <div className="scroll-pointer">
                    <i className={0 == this.state.curIndex || 5 == this.state.curIndex? 'active': ''}></i>
                    <i className={1 == this.state.curIndex ? 'active': ''}></i>
                    <i className={2 == this.state.curIndex ? 'active': ''}></i>
                    <i className={3 == this.state.curIndex ? 'active': ''}></i>
                    <i className={4 == this.state.curIndex ? 'active': ''}></i>
                </div>
            </div>
        ) 
    }
}

module.exports = SlideShow