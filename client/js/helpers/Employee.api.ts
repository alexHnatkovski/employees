import 'cross-fetch/polyfill'
import {Employee} from '../models/Employee';
const API_ROOT = process.env.NODE_ENV === 'development' ? '/api/employees' : '/employees';

export default class EmployeeAPI {
    static async getEmployees(): Promise<Employee[]> {
        let employeesResponse;

        try {
            employeesResponse = await fetch(API_ROOT);
            
        } catch(e) {
            console.error(e);
            return [];
        }

        return employeesResponse.json();
    }

    static async createEmployee(data: Employee): Promise<Employee> {
        let employee;

        try {
            employee = await fetch(API_ROOT, {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .catch(e => {
                console.warn(e);
                return null;
            })

            return employee;
        } catch(e) {
            console.error(e);
            return null;
        }
    }
    static async updateEmployee(id: string, data: Employee) {
        let employee;
        try {
            employee = await fetch(`${API_ROOT}/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json'    
                }
            })
            .then(resp => resp.json())
            .catch(e => {
                console.warn(e);
                return null;
            })
        } catch(e) {
            console.error(e);
            return null;
        }

        return employee;
    }

    static async deleteEmployee(id: string) {
        const result = await fetch(`${API_ROOT}/${id}`, {method: 'DELETE'})
        .then(response => {
            return response.status === 204 && response.ok;
        }).catch(e => {
            return false;
        });

        return result;
    }
}