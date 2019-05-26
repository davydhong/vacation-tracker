import { EmployeeInfo, TimeOffInfo, roles, getNameSuggestions, IO_OPTIONS, getVacationRows } from './utils';
const { READ } = IO_OPTIONS;

export const employeeData = [
  new EmployeeInfo(READ, 1, 'Paul', 'McCartney', roles[2].value, '2018-05-24'),
  new EmployeeInfo(READ, 2, 'Tom', 'Scholz', roles[6].value, '2019-03-24'),
  new EmployeeInfo(READ, 3, 'Michael', 'Jackson', roles[10].value, '2019-04-22'),
  new EmployeeInfo(READ, 4, 'Bruce', 'Springsteen', roles[8].value, '2019-05-21'),
  new EmployeeInfo(READ, 5, 'Elvis', 'Presley', roles[4].value, '2017-05-24')
];

export const vacationData = [
  new TimeOffInfo(READ, 1, 2, '2019-05-24', '2019-05-29'),
  new TimeOffInfo(READ, 2, 3, '2019-05-25', '2018-06-05'),
  new TimeOffInfo(READ, 3, 5, '2019-06-24', '2019-06-26'),
  new TimeOffInfo(READ, 4, 3, '2019-07-25', '2019-08-24')
];

export const names = getNameSuggestions(employeeData);
