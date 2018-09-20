import * as React from 'react';
import {EMPLOYEE_COLUMNS_ORDER, EMPLOYEE_COLUMN_LABELS_MAP} from '../../constants/EmployeesTable.constant';
import EmployeeCreateForm from '../EmploeeCreateForm/EmployeeCreateForm.component';
import {Employee} from '../../models/Employee';
import './employee-list-header.scss';

export namespace EmployeeListHeader {
    export interface Props {
        onSave: Function;
    }
    export interface State {
        showCreateForm: boolean;   
    }
}

export default class EmployeeListHeader extends React.Component<EmployeeListHeader.Props> {
    constructor(props: EmployeeListHeader.Props) {
        super(props);
        this.state = {showCreateForm: false};
        this.toggleCreateForm = this.toggleCreateForm.bind(this);
        this.renderCreateForm = this.renderCreateForm.bind(this);
        this.createEmployee = this.createEmployee.bind(this);
    }
    state: EmployeeListHeader.State;

    createEmployee(data: Employee) {
        this.props.onSave(data);
        this.toggleCreateForm();
    }

    toggleCreateForm() {
        this.setState({showCreateForm: !this.state.showCreateForm});
    }

    renderCreateForm(): JSX.Element | void {
        if (this.state.showCreateForm) {
            return (
                <EmployeeCreateForm onSubmit={this.createEmployee}/>
            )
        }
    }

    render() {
        return (
            <div className="employee-list-header">
                <div className="employee-list-captions employee-item">
                    {
                        EMPLOYEE_COLUMNS_ORDER.map((key: (keyof typeof EMPLOYEE_COLUMN_LABELS_MAP), index) => (
                            <div className="employee-item__column" key={index}>
                                <span className="employee-list-captions__text">{EMPLOYEE_COLUMN_LABELS_MAP[key]}</span>
                            </div>
                        ))
                    }
                    <div className="employee-item__column employee-item__controls">
                        <button className="control-button" onClick={this.toggleCreateForm}>
                        <i className={`fas fa-plus ${this.state.showCreateForm ? 'rotate-45' : ''}`}></i>
                        </button>
                    </div>
                </div>
                {this.renderCreateForm()}
            </div> 
        )    
    }
}