import {combineReducers} from 'redux';  
import {employees} from './employee.reducer';

export const rootReducer = combineReducers({
    employees    
});