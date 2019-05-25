import React, { useReducer, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DatePickers from './DatePickers';
import Suggestion from './Suggestion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { names } from './InitData';
import { EmployeeInfo, roles, IO_OPTIONS } from './utils';
import { EmployeeContext, VacationContext } from './Dashboard';
const { READ, EDIT, DELETE } = IO_OPTIONS;

const useStyles = makeStyles({
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

export function EmployeeRow({ row }) {
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);
  const { dispatchEmployees } = useContext(EmployeeContext);

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
            <EditIcon className={classes.icon} onClick={() => dispatchEmployees({ type: EDIT, id: row.id })} />
            <DeleteIcon className={classes.icon} onClick={() => dispatchEmployees({ type: DELETE, id: row.id })} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}

export function TimeOffRow({ row: { io, id, fullName, timeOffStart, timeOffEnd } }) {
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);
  const { dispatchVacations } = useContext(VacationContext);

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
            console.log('e', e);
          }}
        />
      </TableCell>
      <TableCell>
        {/* time fields */}
        <DatePickers
          defaultTime={timeOffEnd}
          onChange={function handle(e) {
            console.log('e', e);
          }}
        />
      </TableCell>
      <TableCell>
        {editMenu ? (
          <>
            <EditIcon className={classes.icon} onClick={() => dispatchVacations({ type: EDIT, id })} />
            <DeleteIcon className={classes.icon} onClick={() => dispatchVacations({ type: DELETE, id })} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}
