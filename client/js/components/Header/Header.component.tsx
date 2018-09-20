import * as React from 'react';
import './header.scss';

export default class Header extends React.Component {
    render() {
        return (
            <div className="employee-list__header">
                <h2 className="employee-list__header_caption">Employees</h2>
            </div>
        );
    }
} 