export interface Person {
  fullName: string;
  DOB: string;
  role: string;
}

export class Employee implements Person {
  constructor(data: Person = {fullName: '', DOB: '', role: ''}) {
    Object.assign(this, data);
  }
  id?: string;
  fullName: string;
  DOB: string;
  role: string;
}
