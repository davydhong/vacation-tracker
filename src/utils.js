export class EmployeeInfo {
  constructor(io = 'READ', id = 0, firstName = '', lastName = '', role = '', startDate = '') {
    this.io = io;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.startDate = startDate;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class VacationInfo {
  constructor(io = 'READ', id = 0, employeeId = '', timeOffStart = '', timeOffEnd = '') {
    this.io = io;
    this.id = id;
    this.employeeId = employeeId;
    this.timeOffStart = timeOffStart;
    this.timeOffEnd = timeOffEnd;
  }
}

export const roles = [
  { value: 'Engineer I', label: 'Engineer I' },
  { value: 'Engineer II', label: 'Engineer II' },
  { value: 'Engineer III', label: 'Engineer III' },
  { value: 'Product Manager I', label: 'Product Manager I' },
  { value: 'Product Manager II', label: 'Product Manager II' },
  { value: 'Product Manager III', label: 'Product Manager III' },
  { value: 'Recruiter I', label: 'Recruiter I' },
  { value: 'Recruiter II', label: 'Recruiter II' },
  { value: 'Recruiter III', label: 'Recruiter III' },
  { value: 'CEO', label: 'CEO' },
  { value: 'COO', label: 'COO' },
  { value: 'CTO', label: 'CTO' }
];

export const getNames = rows => {
  return [...rows.values()].map(person => {
    const name = person.firstName + ' ' + person.lastName;
    return {
      value: name,
      label: name
    };
  });
};

export const getVacationRows = (vacationData, employeeData) => {
  const vacationRows = new Map();
  for (let [idx, vacation] of vacationData) {
    if (employeeData.get(vacation.employeeId)) {
      vacation.fullName = employeeData.get(vacation.employeeId).fullName;
      vacationRows.set(idx, vacation);
    }
  }
  return vacationRows;
};

export const IO_OPTIONS = {
  READ: 'READ',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};
