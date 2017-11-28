import React, {Component} from 'react'
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
    render () {
        return (<div>
            <SlideShow timer={3000} index = {0} item={this.state.item}/>
            <MoveItem/>
        </div>)
    }
}

module.exports = HotPlay