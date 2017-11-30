import {combineReducers} from 'redux'
import {DEFAULT_INDEX, CHANGE_INDEX} from './actions'

function changeIndex(state={index: 0}, action) {
    switch(action.type) {
        case 'CHANGE_INDEX':
            return Object.assign({}, state, {index: action.index})
        default:
            return state
    }
}

function isShow(state={status: 1}, action){
   switch(action.type) {
        case 'SHOW':
            return Object.assign({}, state, {status: action.status})
        case 'HIDE':
            return Object.assign({}, state, {status: action.status})
        default:
            return  state
   }
}
const Reducers = combineReducers({
    changeIndex,
    isShow
})

export default Reducers