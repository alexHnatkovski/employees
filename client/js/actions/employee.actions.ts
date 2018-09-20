import {Action, AnyAction, ActionCreator, Dispatch} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Employee} from '../models/Employee';
import {ReducerAction} from './index';
import EmployeeAPI from '../helpers/Employee.api';
import {AppState} from '../models/AppState';

export const ADD_EMPLOYEE_SUCCESS = Symbol('Add Employee Success');
export const UPDATE_EMPLOYEE_SUCCESS = Symbol('Update Employee Success');
export const UPDATE_EMPLOYEE_ERROR = Symbol('Update Employee Error');
export const DELETE_EMPLOYEE_SUCCESS = Symbol('Delete Employee Success');
export const DELETE_EMPLOYEE_ERROR = Symbol('Delete Employee Error');

export const EMPLOYEE_LIST_RECEIVED = Symbol('EMPLOYEE_LIST_RECEIVED');
export const EMPLOYEE_FETCH_ERROR = Symbol('EMPLOYEE_FETCH_ERROR');
export const CREATE_EMPLOYEE_ERROR = Symbol('CREATE_EMPLOYEE_ERROR');

export const employeeListReceived: ActionCreator<AnyAction> = (employees: Employee[]) => {
  return {type: EMPLOYEE_LIST_RECEIVED, payload: employees};
}

export const employeeFetchError: ActionCreator<AnyAction> = () => {
  return {type: EMPLOYEE_FETCH_ERROR, payload: []};
}

export const addEmployee: ActionCreator<AnyAction> = (employee: Employee): AnyAction => {
  return {type: ADD_EMPLOYEE_SUCCESS, payload: employee};
}

export const createEmployeeError: ActionCreator<AnyAction> = () => {
  return {type: CREATE_EMPLOYEE_ERROR}
}

export const updateEmployeeSuccess: ActionCreator<AnyAction> = (employee: Employee): AnyAction => {
  return {type: UPDATE_EMPLOYEE_SUCCESS, payload: employee};
}
export const updateEmployeeError: ActionCreator<AnyAction> = (employee: Employee): AnyAction => {
  return {type: UPDATE_EMPLOYEE_ERROR, payload: employee};
}

export function deleteEmployeeCompleted(id: string): AnyAction {
  return {type: DELETE_EMPLOYEE_SUCCESS, payload: {id}};
}
export function deleteEmployeeError(id: string): AnyAction {
  return {type: DELETE_EMPLOYEE_ERROR, payload: {id}};
}

export const fetchEmployees = () => {
  return async (dispatch: ThunkDispatch<AppState, void, AnyAction>) => {
    let employees;
    employees = await EmployeeAPI.getEmployees();

    dispatch(employeeListReceived(employees));
  }
}

export const createEmployee = (data: Employee) => {
  return async (dispatch: ThunkDispatch<AppState, void, AnyAction>) => {
    let employee = await EmployeeAPI.createEmployee(data);
    
    if (employee) {
      dispatch(addEmployee(employee));
    } else {
      dispatch(createEmployeeError())
    }
  }
}

export const updateEmployee = (data: Employee) => {
  const {id, fullName, DOB, role} = data;
  return async (dispatch: ThunkDispatch<AppState, void, AnyAction>) => {
    let employee = await EmployeeAPI.updateEmployee(id, {fullName, DOB, role});
    
    if (employee) {
      dispatch(updateEmployeeSuccess(employee));
    } else {
      dispatch(updateEmployeeError())
    }
  }
}

export const deleteEmployee = (id: string) => {
  return async (dispatch: ThunkDispatch<AppState, void, AnyAction>) => {
    let completed = await EmployeeAPI.deleteEmployee(id);
    
    if (completed) {
      dispatch(deleteEmployeeCompleted(id));
    } else {
      dispatch(deleteEmployeeError(id));
    }
  }
}

