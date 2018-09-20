import * as React from 'react';
import { Employee } from '../../models/Employee';

import './employee-entry.scss';

export namespace EmployeeEntry {
    export interface Props {
        employee: Employee,
        onEmployeeSave: Function;
        onEmployeeDelete: Function;
    }
    export interface State {
        editMode: boolean,
        employee: Employee
    }
}

export default class EmployeeEntry extends React.Component<EmployeeEntry.Props> {
    onEmployeeSave: Function;
    onEmployeeDelete: Function;
    state: EmployeeEntry.State;

    constructor(props: EmployeeEntry.Props) {
        super(props);
        this.onEmployeeSave = props.onEmployeeSave.bind(this);
        this.onEmployeeDelete = props.onEmployeeDelete.bind(this);
        this.handleEmployeeDataChange = this.handleEmployeeDataChange.bind(this)
        this.state = {employee: props.employee, editMode: false};
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleEmployeeDeleteClick = this.handleEmployeeDeleteClick.bind(this);
    }

    handleEmployeeDataChange(e: React.ChangeEvent<HTMLElement>) {
        const target = e.target as HTMLInputElement;
        const prop = target.name as keyof Employee;
        const value = target.value;
        const employee = this.state.employee;

        employee[prop] = value;
        this.setState({employee});
    }

    handleEmployeeDeleteClick() {
        this.setState({editMode: !this.state.editMode, employee: new Employee()});
        this.onEmployeeDelete(this.props.employee.id);
    }

    toggleEditMode() {
        if (this.state.editMode) { 
            this.onEmployeeSave(this.props.employee);    
        }
        this.setState({editMode: !this.state.editMode});
    }

    render() {
        let employeeKeys = Object.keys(this.props.employee).filter(key => key !== 'id');

        return (
            <div className="employee-item">
                {
                    employeeKeys.map((key: keyof Employee, keyIndex) =>
                        <div className="employee-item__column" key={keyIndex}>
                        {
                            this.state.editMode
                                ? (<input type="text" value={this.state.employee[key]} name={key} onChange={this.handleEmployeeDataChange} />)
                                : this.props.employee[key]
                        }
                        </div>
                    )
                }
                <div className="employee-item__column employee-item__controls">
                    <button className="control-button" onClick={this.handleEmployeeDeleteClick}>
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button className="control-button" onClick={this.toggleEditMode}>
                        {
                            this.state.editMode 
                                ? (<i className="fas fa-check"></i>)
                                : (<i className="fas fa-pencil-alt"></i>)
                        }
                    </button>
                </div>
            </div>
        )
    }
}