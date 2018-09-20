import * as React from 'react';
import { connect } from 'react-redux';
import {AppState} from '../../models/AppState';
import {Employee} from '../../models/Employee';
import {createEmployee, addEmployee, deleteEmployee, updateEmployee} from '../../actions/employee.actions';

import EmployeeList from '../../components/EmployeeList/EmployeeList.component'
const mapStateToProps = (state: AppState) => {
    return {
      employees: state.employees
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onSave: (employee: Employee) => {
          dispatch(createEmployee(employee));
        },
        onUpdate: (employee: Employee) => {
            dispatch(updateEmployee(employee));
        },
        onDelete: (id: string) => {
            dispatch(deleteEmployee(id));
        }
      }
}

export const EmployeesContainer = connect(
    mapStateToProps,
    mapDispatchToProps    
)(EmployeeList);