/* eslint-disable no-script-url */

import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { EmployeeRow, TimeOffRow } from './DataRows';
import { EmployeeContext, VacationContext } from './Dashboard';
import { getVacationRows, getNameSuggestions } from './utils';
const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed'
  }
});

export function Employees() {
  const classes = useStyles();
  const { employees } = useContext(EmployeeContext);
  const [displayCount, setDisplayCount] = useState(3);

  return (
    <>
      <Title>Recent Employees</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell name="fullName">Name</TableCell>
            <TableCell name="role">Role</TableCell>
            <TableCell name="startDate">Start Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* New Employee Input */}
          <EmployeeRow className="employee-row-input" />
          {employees
            .filter((ele, idx) => idx < displayCount)
            .map((row, idx) => (
              // Existing Employee Input
              <EmployeeRow {...{ row, key: idx, idx }} />
            ))}
        </TableBody>
      </Table>
      <div className="employees-seemore">
        <Link color="primary" onClick={() => setDisplayCount(displayCount + 3)}>
          See more Employees
        </Link>
      </div>
    </>
  );
}

export function TimeOff() {
  const classes = useStyles();
  const { employeeIDs, employees, vacations } = useContext(VacationContext);
  const vacationRows = getVacationRows(vacations, employees, employeeIDs);
  const nameSuggestions = getNameSuggestions(employees);
  const [displayCount, setDisplayCount] = useState(3);

  console.log('vacationRows', vacationRows);

  return (
    <>
      <Title>Time Off</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell name="fullName">Name</TableCell>
            <TableCell name="timeOffStart">Time-Off Start</TableCell>
            <TableCell name="timeOffEnd">Time-Off End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TimeOffRow className="timeoff-row-input" />
          {vacationRows
            .filter((ele, idx) => idx < displayCount)
            .map((row, idx) => (
              // Existing Employee Input
              <TimeOffRow {...{ row, key: row.id, idx, nameSuggestions }} />
            ))}
        </TableBody>
      </Table>
      <div className="vacations_seemore">
        <Link color="primary" onClick={() => setDisplayCount(displayCount + 3)}>
          See more Vacations
        </Link>
      </div>
    </>
  );
}
