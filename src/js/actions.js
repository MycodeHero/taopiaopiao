// 定义常量
export const CHANGE_INDEX = 'CHANGE_INDEX'
export const DEFAULT_INDEX = 'DEFAULT_INDEX'
//action创建函数
export function changeIndex (index) {
    return {type: CHANGE_INDEX, index}
}

export const SHOW = 'SHOW'
export const HIDE = 'HIDE'
export function isShow (status) {
    return {type: SHOW, status}
}