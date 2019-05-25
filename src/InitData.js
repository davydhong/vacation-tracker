import { EmployeeInfo, VacationInfo, roles, getNames, IO_OPTIONS, getVacationRows } from './utils';

const { READ } = IO_OPTIONS;

export const employeeRows = new Map();
employeeRows.set(1, new EmployeeInfo(READ, 1, 'Paul', 'McCartney', roles[2].value, '2018-05-24'));
employeeRows.set(2, new EmployeeInfo(READ, 2, 'Tom', 'Scholz', roles[6].value, '2019-03-24'));
employeeRows.set(3, new EmployeeInfo(READ, 3, 'Michael', 'Jackson', roles[10].value, '2019-04-22'));
employeeRows.set(4, new EmployeeInfo(READ, 4, 'Bruce', 'Springsteen', roles[8].value, '2019-05-21'));
employeeRows.set(5, new EmployeeInfo(READ, 5, 'Elvis', 'Presley', roles[4].value, '2017-05-24'));

export const employeeRowsArr = [...employeeRows.values()];

export const vacationData = new Map();
vacationData.set(1, new VacationInfo(READ, 1, 2, '2019-05-24', '2019-05-29'));
vacationData.set(2, new VacationInfo(READ, 2, 3, '2019-05-25', '2018-06-05'));
vacationData.set(3, new VacationInfo(READ, 3, 5, '2019-06-24', '2019-06-26'));
vacationData.set(4, new VacationInfo(READ, 4, 3, '2019-07-25', '2019-08-24'));

export const vacationRows = getVacationRows(vacationData, employeeRows);

export const names = getNames(employeeRows);
