require('./MoveItem.less')
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isShow} from '../../actions'
import Button from 'components/Button/Button'
import LazyLoad from 'components/LazyLoad/LazyLoad'
import ajax from 'common/ajax'
import $ from 'common/common'

class MoveItem extends Component {
    constructor (props) {
        super(props)
        this.handleItem = this.handleItem.bind(this)
    }
    handleItem () {
        let itemList = this.props.mvData
        let row = []
        itemList.forEach((item, index)=>{
        row.push(<div key={item.id} className="move-item">
                    <LazyLoad src={'https://gw.alicdn.com/' + item.poster} index={index}/>
                    <div className="movie-details">
                        <p className="show-name">{item.showName}</p>
                        <p>观众评分 <span className="remark">{item.remark}</span></p>
                        <p className="director" style = {!item.director? {visibility: "hidden"} : {}}>{'导演: ' + item.director}</p>
                        <p className="leader-role" style = {!item.leadingRole? {visibility: "hidden"} : {}}>{'主演: ' + (item.leadingRole && item.leadingRole.split(',').slice(0, 3).join(' '))}</p>
                    </div>
                    <div>
                        <Button type={item.soldType}/>
                    </div>
                </div>)
            })
        return row
    }
    render () {
        return (<div className="move-list">
            {this.handleItem()}
        </div>)
    }
}

module.exports = MoveItem