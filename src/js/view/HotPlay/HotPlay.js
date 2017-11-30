require('./HotPlay.less')
import React, {Component} from 'react'
import $ from 'common/common'
import SlideShow from 'components/SlideShow/SlideShow'
import MoveItem from 'components/MoveItem/MoveItem'
import ajax from 'common/ajax'

class HotPlay extends Component {
    constructor (props)  {
        super(props)
        this.state = {item: []}
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
        this.h = window.innerHeight - $('move-list')[0].offsetTop
        $('hot-play')[0].onscroll = function () {
            console.log(this.scrollTop)
        }
    }
    render () {
        return (<div className="hot-play">
            <SlideShow timer={3000} index = {0} item={this.state.item}/>
            <MoveItem h={this.h}/>
        </div>)
    }
}

module.exports = HotPlay