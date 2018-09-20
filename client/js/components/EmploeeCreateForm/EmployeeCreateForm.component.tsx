import * as React from 'react';
import {EMPLOYEE_COLUMNS_ORDER} from '../../constants/EmployeesTable.constant';
import {Employee} from '../../models/Employee';
import './employee-create-form.scss';

export namespace EmployeeCreateForm {
    export interface Props {
        onSubmit: Function;
    }
    export interface State {
        employee: Employee,
        enableSave: boolean,
    }
}

export default class EmployeeCreateForm extends React.Component<EmployeeCreateForm.Props> {
    constructor(props: EmployeeCreateForm.Props) {
        super(props);
        // this.onSave = props.onSave.bind(this);
        this.validateEmployeeData = this.validateEmployeeData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setEmployeeData = this.setEmployeeData.bind(this);
    }
    setEmployeeData(event: React.ChangeEvent<HTMLElement>) {
        const target = event.target as HTMLInputElement;
        const prop: (keyof Employee) = target.name as keyof Employee;
        const value = target.value;
        const employee = this.state.employee;
        employee[prop] = value;
        this.setState({employee});
        this.validateEmployeeData();
    }
    validateEmployeeData() {
        const isValid = EMPLOYEE_COLUMNS_ORDER.every((key: keyof Employee) => !!this.state.employee[key]);
        this.setState({enableSave: isValid});
    }
    handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        this.props.onSubmit(this.state.employee);
    }
    state: EmployeeCreateForm.State = {
        employee: new Employee,
        enableSave: false  
    };
    onSave: Function;

    render() {
        return (
            <div className="create-employee-form">
                    <form className="employee-item" name="EmployeeCreateForm" onSubmit={this.handleSubmit}>
                        {
                            EMPLOYEE_COLUMNS_ORDER.map((key: (keyof Employee), index) => (
                                <div className="employee-item__column" key={index}>
                                    <input name={key} type="text" onChange={this.setEmployeeData} value={this.state.employee[key]}/>
                                </div>
                            ))
                        }
                        <div className="employee-item__column employee-item__controls">
                            <button className="control-button" disabled={!this.state.enableSave} type="submit">
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </form>
                </div>  
        )
    }
}