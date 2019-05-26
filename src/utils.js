export const isValidName = name => /^[a-z ,.'-]+$/i.test(name);
export const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

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
  set fullName(name) {
    name = capitalizeEveryWord(name.trim());
    if (isValidName(name)) {
      const nameArr = name.split(' ');
      if (nameArr.length > 1) {
        const lastName = nameArr.pop();
        const firstName = nameArr.join(' ');
        this.firstName = firstName;
        this.lastName = lastName;
      }
    }
  }
}

export class TimeOffInfo {
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

export const getNameSuggestions = rows =>
  rows.map(person => ({
    value: person.fullName,
    label: person.fullName
  }));

export const getNameIdTable = rows => {
  const result = {};
  rows.forEach(row => {
    result[row.id] = row.fullName;
    result[row.fullName] = row.id;
  });
  return result;
};

export const getVacationRows = (vacationData, employeeData) => {
  const nameIdTable = getNameIdTable(employeeData);
  return vacationData
    .filter(vacation => vacation.employeeId in nameIdTable)
    .map(vacation => {
      vacation.fullName = getNameIdTable(employeeData)[vacation.employeeId];
      return vacation;
    });
};

export const IO_OPTIONS = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export const SORT_OPTIONS = {
  SORT_BY_FULLNAME: 'SORT_BY_FULLNAME',
  SORT_BY_ROLE: 'SORT_BY_ROLE',
  SORT_BY_STARTDATE: 'SORT_BY_STARTDATE',
  SORT_BY_TIMEOFFSTART: 'SORT_BY_TIMEOFFSTART',
  SORT_BY_TIMEOFFEND: 'SORT_BY_TIMEOFFEND'
};

export const removeRow = (array, index) => {
  if (index < array.length) {
    return array.filter((ele, idx) => idx !== index);
  } else {
    return array;
  }
};

export const isValidData = object => {
  if ('employeeId' in object) {
    if (new Date(object.timeOffStart) > new Date(object.timeOffEnd)) {
      return false;
    }
  }

  for (let field in object) {
    if (object[field] === '') {
      return false;
    }
  }
  return true;
};

export const isOnVacation = vacationInfo => {
  const today = new Date();
  return new Date(vacationInfo.timeOffStart) <= today && today <= new Date(vacationInfo.timeOffEnd);
};
