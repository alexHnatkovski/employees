import {ReducerAction} from '../actions';
import {ADD_EMPLOYEE_SUCCESS, UPDATE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_SUCCESS, EMPLOYEE_LIST_RECEIVED} from '../actions/employee.actions';
import {Employee} from '../models/Employee';

export const employees = (prevState: Employee[] = [], action: ReducerAction) => {
    switch (action.type) {
        case EMPLOYEE_LIST_RECEIVED:
            return action.payload;
        case ADD_EMPLOYEE_SUCCESS:
            let currentEmployeeList: Employee[] = [...prevState, action.payload as Employee];
            return currentEmployeeList;
        case UPDATE_EMPLOYEE_SUCCESS:
            const employee = action.payload as Employee;
            const index = prevState.indexOf(employee);

            if (index === -1) {
                return prevState;
            }

            return [...prevState.slice(0, index), employee, ...prevState.slice(index + 1)];
        case DELETE_EMPLOYEE_SUCCESS:
            const id = action.payload.id;
            const filteredEmployees: Employee[] = prevState.filter((employee: Employee) => employee.id !== id);

            return filteredEmployees;
        default:
            return prevState;
    }
}