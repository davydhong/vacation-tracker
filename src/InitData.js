export class EmployeeInfo {
  constructor(id = 0, firstName = '', lastName = '', role = '', startDate = '', vacationStart = '', vacationEnd = '') {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.startDate = startDate;
    this.vacationStart = vacationStart;
    this.vacationEnd = vacationEnd;
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

export const rows = [
  new EmployeeInfo(0, 'Elvis', 'Presley', roles[4].value, '2017-05-24', '2017-05-24', '2017-05-28'),
  new EmployeeInfo(1, 'Paul', 'McCartney', roles[2].value, '2018-05-24', '2018-05-24', '2018-05-28'),
  new EmployeeInfo(2, 'Tom', 'Scholz', roles[6].value, '2019-03-24', '2019-05-24', '2019-05-28'),
  new EmployeeInfo(3, 'Michael', 'Jackson', roles[10].value, '2019-04-22', '2019-05-24', '2019-05-28'),
  new EmployeeInfo(4, 'Bruce', 'Springsteen', roles[8].value, '2019-05-21', '2019-05-24', '2019-05-28')
];

export const names = rows.map(person => {
  const name = person.firstName + ' ' + person.lastName;
  return {
    value: name,
    label: name
  };
});
