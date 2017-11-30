import React, {Component} from 'react'
import $ from 'common/common'

class LazyLoad extends Component {
    constructor (props) {
        super(props)
        this.lazy = this.lazy.bind(this)
    } 
    lazy (ele) {
        var myImage = (function () {
            var image = document.createElement('img')
            ele.appendChild(image)
            return {
                setSrc: function (src) {
                    image.src = src
                }
            }
        }())
    
        return (function () {
            var image = document.createElement('img')
            image.onload = function () {
                myImage.setSrc(this.src)
            }
            return {
                setSrc: function (src) {
                    myImage.setSrc('data:image/png;base64,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')
                    image.src = src
                }
            }
        }())
    }
    componentDidMount () {
        var targetEle = document.getElementsByClassName('lazy')[this.props.index]
        this.lazy(targetEle).setSrc(this.props.src)
    }
    render () {
        return (<div className="image-block lazy">   
        </div>) 
    }
}

module.exports = LazyLoad