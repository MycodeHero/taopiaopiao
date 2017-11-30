require('./MoveItem.less')
import React, {Component} from 'react'
import Button from 'components/Button/Button'
import LazyLoad from 'components/LazyLoad/LazyLoad'
import ajax from 'common/ajax'
import $ from 'common/common'

class MoveItem extends Component {
    constructor (props) {
        super(props)
        this.handleItem = this.handleItem.bind(this)
        this.state = {item:[]}
    }
    handleItem (data) {
        let itemList = ([]).concat(data)[0].data.returnValue
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
        this.setState({
            item: row
        })
    }
    componentDidMount () {
        ajax({
            method: 'get',
            url: 'http://localhost:3000/moveDetails',
            flag: true,
        }).then((data)=>{
            this.handleItem(data)
        })
    }
    render () {
        return (<div className="move-list" style={{height: this.props.h}}>
            {this.state.item}
        </div>)
    }
}

module.exports = MoveItem