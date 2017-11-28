require('./MoveItem.less')
import React, {Component} from 'react'
import Button from 'components/Button/Button'
import ajax from 'common/ajax'

class MoveItem extends Component {
    constructor (props) {
        super(props)
        this.handleItem = this.handleItem.bind(this)
        this.state = {item:[]}
    }
    handleItem (data) {
        let itemList = ([]).concat(data)[0].data.returnValue
        let row = []
        console.log(itemList)
        itemList.forEach((item, index)=>{
            row.push(<div key={item.id} className="move-item">
                        <div className="image-block">
                            <img src={'https://gw.alicdn.com/' + item.poster}/>
                        </div>
                        <div className="movie-details">
                            <p className="show-name">{item.showName}</p>
                            <p>观众评分 <span className="remark">{item.remark}</span></p>
                            <p className="director">{'导演: ' + item.director}</p>
                            <p className="leader-role">{'主演: ' + item.leadingRole.split(',').join(' ')}</p>
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
        return (<div className="move-list">
            {this.state.item}
        </div>)
    }
}

module.exports = MoveItem