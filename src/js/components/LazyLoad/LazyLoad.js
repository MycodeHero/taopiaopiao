import React, {Component} from 'react'
import $ from 'common/common'

class LazyLoad extends Component {
    constructor (props) {
        super(props)
        this.lazy = this.lazy.bind(this)
    } 
    lazy (ele) {
        var myImage = (function () {
            var a = document.createElement('a')
            ele.appendChild(a)
            var firstStatus = true
            return {
                setSrc: function (src) {
                    if(firstStatus) {
                        a.style.cssText += `background-image:url(${src});background-size: 50% 50%;background-repeat:no-repeat;background-position:50%`
                        firstStatus = false
                        return
                    }
                    a.style.cssText += `background-image:url(${src});background-size: 100% 100%;`
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
                    myImage.setSrc("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA2MiA2Mic+PHBhdGggZmlsbD0nI0ZGRicgZD0nTTM5LjEyNSA4LjE5NmMtNS4wNzctMS4zNDYtNi42NC04LjA1LTE2LjEzLTguMDUgMy40MzUgMy45NDcgMS44NSA3LjQxLS43MyA4LjIwNkM5LjY4OCAxMS43MTIuMjU2IDIyLjMxLjg1MyAzNi45NTggMS40NjYgNTIuMDM4IDE0LjM1IDYxLjg3MiAzMSA2MS44NzJzMjkuNTM0LTkuODM0IDMwLjE0OC0yNC45MTRjLjYwNy0xNC44ODQtOS4xNC0yNS41ODYtMjIuMDIzLTI4Ljc2Mk01Ni44OSAyOC45ODRjLS4wMDUuMDczLS4wNzYuNDU0LS40NTMuNTUtLjAxOC4wMDMtLjAzNC4wMTMtLjA1LjAyLS40ODguMjItMS4yMjguODMzLTEuNDkgMi41NjYtLjA5Ni43ODQtLjI1NCAxLjYwMi0uNDI1IDIuNDgybC0uMDAyLjAxYy0uNDg0IDIuNS0xLjI2MiA0LjU3Ni0yLjMwOCA2LjE3LTEuNDY1IDIuMjMtMy40NTcgMy40NzMtNS43NiAzLjU5NC0xLjY4LjA4OC0zLjA5NC4wOTQtNC4zMi4wMTYtMy41NS0uMjIzLTUuNTg2LTEuMTQ0LTcuMDI2LTMuMTc4LTEuOTQtMi43MzYtMi44MjYtNy43MS0zLjk3Ny03LjcxLTEuMTUyIDAtMi4wMzggNC45NzQtMy45NzcgNy43MS0xLjQ0IDIuMDMzLTMuNDc2IDIuOTU0LTcuMDI3IDMuMTc4LTEuMjI2LjA3Ny0yLjY0LjA3Mi00LjMyLS4wMTYtMi4zMDMtLjEyLTQuMjk0LTEuMzYzLTUuNzYtMy41OTMtMS4wNDctMS41OTQtMS44MjQtMy42Ny0yLjMxLTYuMTd2LS4wMWMtLjE3LS44OC0uMzMtMS43LS40MjYtMi40ODMtLjI2Mi0xLjczNC0xLTIuMzQ4LTEuNDg4LTIuNTY1LS4wMTctLjAwOC0uMDM0LS4wMTgtLjA1LS4wMjItLjM4LS4wOTUtLjQ1LS40NzctLjQ1NC0uNTUtLjA0NC0uNy0uMjItMi4yNjUtLjI4LTMuMjQtLjA0NS0uNzI4LjU1NC0uODIzLjY2OC0uODMgNC4xOS0uMjY1IDEzLjkxMy0uNzg3IDE4LjMzNC4zNjcgMS4zMi4zNDUgNS4wOTcgMS4wNjIgNy4wOSAxLjA2MiAxLjk5MiAwIDUuNzctLjcxNyA3LjA5LTEuMDYyIDQuNDItMS4xNTQgMTQuMTQyLS42MzIgMTguMzMzLS4zNjguMTEzLjAwNy43MTMuMTAzLjY2OC44My0uMDYuOTc2LS4yMzYgMi41NC0uMjggMy4yNDInLz48cGF0aCBmaWxsPScjRkZGJyBkPSdNMjIuOTIgMjguNjk2Yy0uMDk3LS4wMi0uMjAyLS4wNC0uMzE1LS4wNi0xLjU3NC0uMjk1LTQuNzgzLS43MDItNy4yNjUtLjU0NS0xLjA5NC4wNy0yLjA0Ni4yNDgtMi42NTYuNTkyLTEuNTEuODU2LTEuNjM0IDIuMi0xLjM4IDQuMDA2LjA3NS41MjQuMTggMS4wODguMjkzIDEuNjkuNjA0IDMuMjIgMi4wMzIgNi42NSA1LjAwNCA2LjgyIDEuMzM1LjA4IDIuNDMuMDgzIDMuMzM4LjAyNyAyLjc5LS4xNzUgMy43OTUtLjkzNSA0LjQ4Ny0xLjk2NSAzLjk2NS01Ljg4OCAyLjM5OC05Ljc1Ni0xLjUwNi0xMC41NjRNMzkuMjQgMjguNjk2Yy4wOTUtLjAyLjItLjA0LjMxMy0uMDYgMS41NzQtLjI5NSA0Ljc4My0uNzAyIDcuMjY1LS41NDUgMS4wOTQuMDcgMi4wNDYuMjQ4IDIuNjU2LjU5MiAxLjUxLjg1NiAxLjYzNCAyLjIgMS4zOCA0LjAwNi0uMDc1LjUyNC0uMTggMS4wODgtLjI5MyAxLjY5LS42MDMgMy4yMi0yLjAzIDYuNjUtNS4wMDMgNi44Mi0xLjMzNC4wOC0yLjQzLjA4My0zLjMzNy4wMjctMi43OS0uMTc1LTMuNzk1LS45MzUtNC40ODgtMS45NjUtMy45NjMtNS44ODgtMi4zOTYtOS43NTYgMS41MDctMTAuNTY0Jy8+PC9zdmc+")
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