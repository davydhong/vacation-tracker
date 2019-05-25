/* eslint-disable no-script-url */

import React, { useContext, useEffect } from 'react';
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
import { getVacationRows } from './utils';
const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed'
  }
});

export function Employees() {
  const classes = useStyles();
  const { employees } = useContext(EmployeeContext);

  return (
    <>
      <Title>Recent Employees</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Start Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* New Employee Input */}
          <EmployeeRow />
          {employees.map(row => (
            // Existing Employee Input
            <EmployeeRow {...{ row, key: row.id }} />
          ))}
        </TableBody>
      </Table>
      <div className="employees_seemore">
        <Link color="primary" href="javascript:;">
          See more Employees
        </Link>
      </div>
    </>
  );
}

export function TimeOff() {
  const classes = useStyles();
  const { employees } = useContext(EmployeeContext);
  const { vacations } = useContext(VacationContext);
  const vacationRows = getVacationRows(vacations, employees);

  return (
    <>
      <Title>Time Off</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Time-Off Start</TableCell>
            <TableCell>Time-Off End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...vacationRows.values()].map(row => (
            // Existing Employee Input
            <TimeOffRow {...{ row, key: row.id }} />
          ))}
        </TableBody>
      </Table>
      <div className="vacations_seemore">
        <Link color="primary" href="javascript:;">
          See more Vacations
        </Link>
      </div>
    </>
  );
}
