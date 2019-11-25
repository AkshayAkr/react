import {combineReducers} from 'redux'
import dataReducer from './dataReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers(
    {
        dataReducer,
        loginReducer
    }
)

export default rootReducer