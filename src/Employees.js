/* eslint-disable no-script-url */

import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TextField from '@material-ui/core/TextField';
import DatePickers from './DatePickers';
import Suggestion from './Suggestion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { employeeRows, vacationRows, names } from './InitData';
import { EmployeeInfo, roles } from './utils';

const useStyles = makeStyles({
  table: {
    tableLayout: 'fixed'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

const SHOW_EDIT_OPTION = 'SHOW_EDIT_OPTION';
const HIDE_EDIT_OPTION = 'HIDE_EDIT_OPTION';
function editMenuReducer(state, action) {
  switch (action.type) {
    case SHOW_EDIT_OPTION:
      return true;
    case HIDE_EDIT_OPTION:
      return false;
    default:
      return state;
  }
}

function EmployeeRow({ row }) {
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);

  if (!row) {
    row = new EmployeeInfo();
  }
  return (
    <TableRow
      onMouseEnter={() => dispatchEditMenu({ type: SHOW_EDIT_OPTION })}
      onMouseLeave={() => dispatchEditMenu({ type: HIDE_EDIT_OPTION })}>
      <TableCell>
        {/* name fields */}
        <TextField
          value={row.fullName}
          onChange={function handle(e) {
            console.log('e.target.value', e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        {/* role fields */}
        <Suggestion {...{ suggestions: roles, defaultVal: row.role, placeholder: row.role }} />
      </TableCell>
      <TableCell>
        {/* time fields */}
        <DatePickers
          defaultTime={row.startDate}
          onChange={function handle(e) {
            console.log('e.target.value', e);
          }}
        />
      </TableCell>
      <TableCell>
        {editMenu ? (
          <>
            <EditIcon className={classes.icon} />
            <DeleteIcon className={classes.icon} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}

function TimeOffRow({ row: { io, fullName, timeOffStart, timeOffEnd } }) {
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);

  return (
    <TableRow
      onMouseEnter={() => dispatchEditMenu({ type: SHOW_EDIT_OPTION })}
      onMouseLeave={() => dispatchEditMenu({ type: HIDE_EDIT_OPTION })}>
      <TableCell>
        <Suggestion {...{ suggestions: names, defaultVal: fullName, placeholder: fullName }} />
      </TableCell>
      <TableCell>
        {/* time fields */}
        <DatePickers
          defaultTime={timeOffStart}
          onChange={function handle(e) {
            console.log('e.target.value', e);
          }}
        />
      </TableCell>
      <TableCell>
        {/* time fields */}
        <DatePickers
          defaultTime={timeOffEnd}
          onChange={function handle(e) {
            console.log('e.target.value', e);
          }}
        />
      </TableCell>
      <TableCell>
        {editMenu ? (
          <>
            <EditIcon className={classes.icon} />
            <DeleteIcon className={classes.icon} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}

export function Employees() {
  const classes = useStyles();

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
          {[...employeeRows.values()].map(row => (
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
