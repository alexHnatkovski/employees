import * as React from 'react';
import {EmployeesContainer} from '../containers/Employees/EmployeesContainer';
import Header from './Header/Header.component';
import './main.scss';

const App = () => (
    <div className="employees-container">
        <Header/>
        <EmployeesContainer/>
    </div>
);

export default App;