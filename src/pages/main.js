require('./main.less')
import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeIndex} from '../js/actions'
import Nav from 'components/Nav/Nav'
import SearchBar from 'components/SearchBar/SearchBar'
import SlideShow from 'components/SlideShow/SlideShow'
import SlideBlock from 'components/SlideBlock/SlideBlock'
import HolyPlay from 'view/HotPlay/HotPlay'
import Rank from 'view/Rank/Rank'
import WillPlay from 'view/WillPlay/WillPlay'

class Main extends Component {
    constructor (props) {
        super(props)
        this.state={index: 0}
    }
    render () {
        return (
            <div>
                <div className="top-header">
                    <div className="top-pos">北京</div>
                    <SearchBar content="搜影片、影院、影人"/>
                    <div className="top-sweap">取消</div>
                </div>
                <Nav list={[{route: '/hot', content: '正在热播'}, {route: '/will', content: '即将上映'}, {route: '/rank', content: '排行榜'}]} index = {this.state.index} changeIndex={this.props.changeIndex}>
                    <SlideBlock index={this.state.index}/>
                    <Route path="/hot" component={HolyPlay}/>
                    <Route path="/will" component={WillPlay}/>
                    <Route path="/rank" component={Rank}/>
                </Nav>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        index: state.changeIndex.index
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeIndex: (index)=>{dispatch(changeIndex(index))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)