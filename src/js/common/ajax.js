//ajax封装函数
function originAjax (json) {
    var {url, method, flag, data, callback} = json
    var xhr = null
    var params = params = enDash(data) //查询字段
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    if(method.toUpperCase() == 'GET') {
        xhr.open(method, url + '?' + params, flag)
    }else if(method.toUpperCase() == 'POST') {
        xhr.open(method, url, flag)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    }
    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            callback && callback(xhr.responseText)
        }
    }
    if(method.toUpperCase() == 'GET') {
        xhr.send(null)
    }else if(method.toUpperCase() == 'POST') {
        xhr.send(data)
    }
    return this
}

//主要用于拼接url查询字段
function enDash(data, dash = '&') {
    var params = []
    var paramData = data
    for(var key in paramData) {
        if(Object.hasOwnProperty.call(paramData, key)){
            params.push(key + '=' + paramData[key])
        }
    }
    return params.join(dash)
}

//用promise来封装jsonp函数
export default function ajax (json) {
    return new Promise(function (resolve, reject) {
        originAjax(Object.assign({}, json, {callback: function (e) {
            var data = JSON.parse(e)
            if(data.data.returnCode === '0') {
                resolve(data)
            }
        }}))
    })
}