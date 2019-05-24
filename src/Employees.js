/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TextField from '@material-ui/core/TextField';
import DatePickers from './DatePickers';
import { EmployeeInfo, rows, roles, names } from './InitData';
import Suggestion from './Suggestion';

function EmployeeRow({ row }) {
  if (!row) {
    row = new EmployeeInfo();
  }
  console.log('row.role', row.role);
  return (
    <TableRow>
      <TableCell>
        {/* name fields */}
        <TextField
          value={row.firstName + ' ' + row.lastName}
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
    </TableRow>
  );
}

function TimeOffRow({ row }) {
  const fullName = row.firstName + ' ' + row.lastName;
  return (
    <TableRow>
      <TableCell>
        <Suggestion {...{ suggestions: names, defaultVal: fullName, placeholder: fullName }} />
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
        {/* time fields */}
        <DatePickers
          defaultTime={row.startDate}
          onChange={function handle(e) {
            console.log('e.target.value', e);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export function Employees() {
  return (
    <>
      <Title>Recent Employees</Title>
      <Table size="small">
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
          {rows.map(row => (
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
  return (
    <>
      <Title>Time Off</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Time-Off Start</TableCell>
            <TableCell>Time-Off End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            // Existing Employee Input
            <TimeOffRow {...{ row, key: row.id }} />
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
