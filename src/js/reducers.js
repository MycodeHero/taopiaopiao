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

const changePosApp = combineReducers({
    changeIndex
})

export default changePosApp