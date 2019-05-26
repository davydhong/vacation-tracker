/* eslint-disable no-script-url */

import React, { useContext, useState, useEffect } from 'react';
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
import { getVacationRows, getNameSuggestions, getNameIdTable, SORT_OPTIONS } from './utils';
const { SORT_BY_FULLNAME, SORT_BY_ROLE, SORT_BY_STARTDATE, SORT_BY_TIMEOFFSTART, SORT_BY_TIMEOFFEND } = SORT_OPTIONS;

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed'
  }
});

//
// ─── EMPLOYEES ──────────────────────────────────────────────────────────────────
//

export function Employees() {
  const classes = useStyles();
  const { employees, newEmployeeId, setNewEmployeeId, dispatchEmployees } = useContext(EmployeeContext);
  const [displayCount, setDisplayCount] = useState(3);

  return (
    <>
      <Title>Recent Employees</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell name="fullName" onClick={() => dispatchEmployees({ type: SORT_BY_FULLNAME })}>
              Name
            </TableCell>
            <TableCell name="role" onClick={() => dispatchEmployees({ type: SORT_BY_ROLE })}>
              Role
            </TableCell>
            <TableCell name="startDate" onClick={() => dispatchEmployees({ type: SORT_BY_STARTDATE })}>
              Start Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* New Employee Input */}
          <EmployeeRow className="employee-row-input" {...{ newEmployeeId, setNewEmployeeId }} />
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

//
// ─── TIMEOFF ────────────────────────────────────────────────────────────────────
//

export function TimeOff() {
  const classes = useStyles();
  const { dispatchVacations, employeeIDs, employees, vacations, newVacationId, setNewVacationId } = useContext(
    VacationContext
  );
  const vacationRows = getVacationRows(vacations, employees, employeeIDs);
  const nameSuggestions = getNameSuggestions(employees);
  const [displayCount, setDisplayCount] = useState(3);

  const nameIdTable = getNameIdTable(employees);

  return (
    <>
      <Title>Time Off</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell name="fullName" onClick={() => dispatchVacations({ type: SORT_BY_FULLNAME })}>
              Name
            </TableCell>
            <TableCell name="timeOffStart" onClick={() => dispatchVacations({ type: SORT_BY_TIMEOFFSTART })}>
              Time-Off Start
            </TableCell>
            <TableCell name="timeOffEnd" onClick={() => dispatchVacations({ type: SORT_BY_TIMEOFFEND })}>
              Time-Off End
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TimeOffRow
            className="timeoff-row-input"
            {...{ newVacationId, setNewVacationId, nameIdTable, nameSuggestions }}
          />
          {vacationRows
            .filter((ele, idx) => idx < displayCount)
            .map((row, idx) => (
              // Existing Employee Input
              <TimeOffRow {...{ row, key: row.id, idx }} />
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
