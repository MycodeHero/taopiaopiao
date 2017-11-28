require('./SearchBar.less') 
import React, {Component} from 'react'
import $ from 'common/common'

class SearchBar extends Component {
    constructor (props) {
        super(props)
        this.changeStyle = this.changeStyle.bind(this)
        this.close = this.close.bind(this)
    }

    changeStyle (e) {
        e.stopPropagation()
        let inputWrap = $('input-wrapper')
        let closeDom = $('close')
        inputWrap.addAttr('class', 'active')
        closeDom.css({'display': 'block'})
    }

    close (e) {
        e.stopPropagation()
        let inputWrap = $('input-wrapper')
        let closeDom = $('close')
        closeDom.css({'display': 'none'})
        inputWrap.removeAttr('class', 'active')
    }
    render () {
        return (
        <div className="search-wrap" onTouchStart={this.changeStyle}>
            <div className="wrapper">
                <div className="input-wrapper">
                    <i className="icon input_icon"></i>
                    <input onFocus={this.doFocus} placeholder={this.props.content}></input>
                </div>
                <i className="icon close_icon close" onTouchStart={this.close}></i>
            </div>
        </div>)
    }
}

module.exports = SearchBar