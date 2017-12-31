require('./HotPlay.less')
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isShow} from '../../actions'
import $ from 'common/common'
import SlideShow from 'components/SlideShow/SlideShow'
import MoveItem from 'components/MoveItem/MoveItem'
import Tooltip from 'components/Tooltip/Tooltip'
import ajax from 'common/ajax'

class HotPlay extends Component {
    constructor (props)  {
        super(props)
        this.state = {active: false, mvData:[]}
        this.pageNum = 10
        this.item = []
        this.initPos = 0
        this.status = 1
        this.saveData = []
        this.queryAd = this.queryAd.bind(this)
        this.movieFile = this.movieFile.bind(this)
        this.handleItem = this.handleItem.bind(this)
        this.addScroll = this.addScroll.bind(this)
    }
    handleItem (data) {
        var handleObject = data.data
        this.status = handleObject.status
        return this.saveData = (this.saveData).concat(handleObject.returnValue)
    }
    queryAd () {
        ajax({
            method: 'get',
            url: 'http://localhost:8080/queryadvertise',
            flag: true
        }).then((data) => {
            this.item = data.data.returnValue
        })
    }
    movieFile () {
        ajax({
            method: 'get',
            url:'http://localhost:8080/mf',
            data: {
                pageNum: this.pageNum
            },
            flag: true,
        }).then((data)=>{
            this.setState({
                mvData: this.handleItem(data)
            }) 
        })
    }
    componentDidMount () {
        this.queryAd()
        this.movieFile()
        this.addScroll()
    }
    addScroll () {
        let _self = this
        let handleDom = $('hot-play')[0]
        let slideshowDom = $('slideshow')[0]
        let moveListDom = $('move-list')[0]
        this.h = window.innerHeight - $('slideshow')[0].offsetTop
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
            if(_self.h + this.scrollTop >= moveListDom.offsetHeight + slideshowDom.offsetHeight) {
                if(!_self.show && _self.status) {
                    _self.movieFile()
                }
                _self.setState({
                    active: true,
                })
            }
        }
    }
    render () {
        return (<div className="hot-play" style={{height: this.h}}>
            <SlideShow timer={3000} index = {0} item={this.item}/>
            <MoveItem mvData = {this.state.mvData} active={this.props.isShow}/>
            <Tooltip active={this.state.active}/>
        </div>)
    }
}
let mapDispatchToProps = (dispatch)=> {
    return {
        isShow: (status)=>{dispatch(isShow(status))}
    }
}
export default connect(null, mapDispatchToProps)(HotPlay)