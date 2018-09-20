import * as React from 'react';
import {Employee} from '../../models/Employee';
import EmployeeEntry from '../EmployeeEntry/EmployeeEntry.component';
import EmployeeListHeader from '../EmployeeListHeader/EmployeeListHeader.component';
import './employee-list.scss';

export namespace EmployeeList {
    export interface Props {
        employees: Employee[],
        onSave: Function;
        onUpdate: Function;
        onDelete: Function;
    }
    export interface State {
        showNewEmployeeForm: boolean
    }
}

export default class EmployeeList extends React.Component<EmployeeList.Props> {
    onEmployeeSave: Function;
    onEmployeeDelete: Function;
    onEmployeeUpdate: Function;
    state: EmployeeList.State

    constructor(props: EmployeeList.Props) {
        super(props);
        this.onEmployeeSave = props.onSave.bind(this);
        this.onEmployeeDelete = props.onDelete.bind(this);
        this.onEmployeeUpdate = props.onUpdate.bind(this);
        this.state = {showNewEmployeeForm: false};
    }

    render() {
        return (
            <div className="employee-list">
                <EmployeeListHeader onSave={this.onEmployeeSave}></EmployeeListHeader>
                <div className="employee-list-data">
                {
                    this.props.employees.map((employee: Employee, index: number) => {
                        return <EmployeeEntry
                                key={index} 
                                employee={employee}
                                onEmployeeSave={this.onEmployeeUpdate}
                                onEmployeeDelete={this.onEmployeeDelete}
                            ></EmployeeEntry>;                
                    })
                }
            </div>
        </div>)
    }
}