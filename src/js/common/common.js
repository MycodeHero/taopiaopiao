(function (window, fn) {
    module.exports = fn()
}(window, function () {
    var Mixin = function (select, context = document) {
        return new Mixin.prototype.init(select, context)
    }

    //反函数柯力化 可以将原型中方法提取出来
    Function.prototype.uncurrying = function () {
        var _self = this
        return function () {
            return Function.prototype.call.apply(_self, arguments)
        }
    }

    //添加属性方法
    function addAttr (name, value) {
        var ele = this['0']
        var originValue = ele.getAttribute(name)
        if(~originValue.indexOf(value)) {
            return this
        }
        ele.className = originValue + ' ' + value 
        return this
    }

    //删除属性方法
    function removeAttr(name, value) {
        var ele = this['0']
        var originValue = ele.getAttribute(name)
        ele.className = originValue.replace(value, '').replace(/\s*/g, '').trim()
        return this
    }

    //添加行间样式方法
    function css (json) {
        var ele = this['0']
        var ctext = ''
        var reg = /([A-Z])/g
        for(var prop in json) {
            if(toStr.call(json[prop], prop)) {
                var value =  json[prop]
                var key = prop.replace(reg, function ($, $1) {
                    return '-' + $1.toLowerCase()
                })
                ctext += key + ':' + value + ';'
            }
        }
       ele.style.cssText = ctext
       return this
    }
    
     //获取mixin对象
     Mixin.prototype.get = function (select, context) {
        return context.getElementsByClassName(select)[0]
    }


    //获取原型上的方法toString, 便于判断参数类型
    const toStr = Object.prototype.toString.uncurrying()

    //对象初始化
    Mixin.prototype.init = function (select, context = document) {
        this['0'] = Mixin.prototype.get(select, context)
        this.addAttr = addAttr.bind(this)
        this.removeAttr = removeAttr.bind(this)
        this.css = css.bind(this)
        return this
    } 

    Mixin.prototype.init.prototype = Mixin.prototype
    return Mixin
}))