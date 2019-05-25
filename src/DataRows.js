import React, { useReducer, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DatePickers from './DatePickers';
import Suggestion from './Suggestion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { EmployeeInfo, roles, IO_OPTIONS, isValidName } from './utils';
import { EmployeeContext, VacationContext } from './Dashboard';
const { CREATE, READ, UPDATE, DELETE } = IO_OPTIONS;

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

const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_ROLE = 'UPDATE_ROLE';
const UPDATE_START_DATE = 'UPDATE_START_DATE';
function employeeDataReducer(state, action) {
  switch (action.type) {
    case UPDATE:
      if (action.fullName) {
        if (isValidName(action.fullName)) {
          console.log('action', action);
          const nameArr = action.fullName.split();
          if (nameArr.length > 1) {
            const lastName = nameArr.pop();
            const firstName = nameArr.join(' ');
            state.firstName = firstName;
            state.lastName = lastName;
            console.log('state', state);
          }
        }
      } else {
      }
      return state;
    default:
      return state;
  }
}

function handleDataUpdate(
  e,
  state,
  setGenericState,
  fieldName = e.target.attributes.name.value,
  value = e.target.value
) {
  console.log({
    state,
    fieldName,
    value
  });
  state[fieldName] = value;
  setGenericState(state);
}

export function EmployeeRow({ row, idx }) {
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);
  const { dispatchEmployees } = useContext(EmployeeContext);
  if (!row) {
    row = new EmployeeInfo(UPDATE);
  }
  // const [employeeData, dispatchEmployeeData] = useReducer(employeeDataReducer, row);

  const [employeeData, setEmployeeData] = useState(row);

  return (
    <TableRow
      onMouseEnter={() => dispatchEditMenu({ type: SHOW_EDIT_OPTION })}
      onMouseLeave={() => dispatchEditMenu({ type: HIDE_EDIT_OPTION })}>
      <TableCell>
        {/* name fields */}
        {employeeData.io === READ ? (
          employeeData.fullName
        ) : (
          <TextField
            name="fullName"
            defaultValue={employeeData.fullName}
            onChange={e => {
              handleDataUpdate(e, employeeData, setEmployeeData);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {/* role fields */}
        {employeeData.io === READ ? (
          employeeData.role
        ) : (
          <Suggestion
            name="role"
            callBack={eventValue => {
              handleDataUpdate(null, employeeData, setEmployeeData, 'role', eventValue);
            }}
            {...{ suggestions: roles, defaultVal: employeeData.role, placeholder: employeeData.role }}
          />
        )}
      </TableCell>
      <TableCell>
        {/* time fields */}
        {employeeData.io === READ ? (
          new Date(employeeData.startDate).toLocaleDateString('en-us')
        ) : (
          <DatePickers
            defaultTime={employeeData.startDate}
            name="startDate"
            handle={e => {
              handleDataUpdate(e, employeeData, setEmployeeData, 'startDate', e.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {employeeData.io === UPDATE ? (
          // TODO: valid check to show
          <CheckIcon className={classes.icon} onClick={() => dispatchEmployees({ type: READ, id: idx })} />
        ) : editMenu ? (
          <>
            <EditIcon
              className={classes.icon}
              onClick={() => dispatchEmployees({ type: UPDATE, id: idx, data: employeeData })}
            />
            <DeleteIcon className={classes.icon} onClick={() => dispatchEmployees({ type: DELETE, id: idx })} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}

export function TimeOffRow({ idx, row, nameSuggestions }) {
  console.log('row', row);

  if (!row) {
    row = new EmployeeInfo(UPDATE);
  }
  const { io, id, fullName, timeOffStart, timeOffEnd } = row;
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);
  const { dispatchVacations } = useContext(VacationContext);

  return (
    <TableRow
      onMouseEnter={() => dispatchEditMenu({ type: SHOW_EDIT_OPTION })}
      onMouseLeave={() => dispatchEditMenu({ type: HIDE_EDIT_OPTION })}>
      <TableCell>{fullName}</TableCell>
      <TableCell>
        {/* time fields */}
        {io === READ ? (
          new Date(timeOffStart).toLocaleDateString('en-us')
        ) : (
          <DatePickers
            defaultTime={timeOffStart}
            onChange={function handle(e) {
              console.log('e.target.value', e);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {/* time fields */}
        {io === READ ? (
          new Date(timeOffEnd).toLocaleDateString('en-us')
        ) : (
          <DatePickers
            defaultTime={timeOffEnd}
            onChange={function handle(e) {
              console.log('e.target.value', e);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {io === UPDATE ? (
          // TODO: valid check to show
          <CheckIcon className={classes.icon} onClick={() => dispatchVacations({ type: READ, id: idx })} />
        ) : editMenu ? (
          <>
            <EditIcon className={classes.icon} onClick={() => dispatchVacations({ type: UPDATE, id: idx })} />
            <DeleteIcon className={classes.icon} onClick={() => dispatchVacations({ type: DELETE, id: idx })} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}
