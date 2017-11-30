require('./HotPlay.less')
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isShow} from '../../actions'
import $ from 'common/common'
import SlideShow from 'components/SlideShow/SlideShow'
import MoveItem from 'components/MoveItem/MoveItem'
import ajax from 'common/ajax'

class HotPlay extends Component {
    constructor (props)  {
        super(props)
        this.state = {item: []}
        this.initPos = 0
    }
    componentDidMount () {
        ajax({
            method: 'get',
            url: 'http://localhost:3000/queryadvertise',
            flag: true
        }).then((data) => {
            this.setState({
                item: data.data.returnValue
            })
        })
    }
    componentWillUpdate(){
        let _self = this
        let handleDom = $('hot-play')[0]
        this.h = window.innerHeight - $('move-list')[0].offsetTop
        handleDom.ontouchstart = function () {
            this.initPos = this.scrollTop
        }
        handleDom.onscroll = function () {
            if(this.scrollTop - this.initPos > 250) {
                _self.props.isShow(0)
            }
            if(this.initPos - this.scrollTop > 250) {
                _self.props.isShow(1)
            }
        }
    }
    render () {
        return (<div className="hot-play">
            <SlideShow timer={3000} index = {0} item={this.state.item}/>
            <MoveItem h={this.h}/>
        </div>)
    }
}

let mapDispatchToProps = (dispatch)=> {
    return {
        isShow: (status)=>{dispatch(isShow(status))}
    }
}
export default connect(null, mapDispatchToProps)(HotPlay)