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
import { EmployeeInfo, TimeOffInfo, roles, IO_OPTIONS, isValidData, isOnVacation } from './utils';
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

function handleDataUpdate(
  e,
  state,
  setGenericState,
  fieldName = e.target.attributes.name.value,
  value = e.target.value,
  callBack
) {
  state[fieldName] = value;
  setGenericState(state);
}

//
// ─── EMPLOYEEROW ────────────────────────────────────────────────────────────────
//
export function EmployeeRow({ row, idx }) {
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);
  const { dispatchEmployees, newEmployeeId, setNewEmployeeId } = useContext(EmployeeContext);

  if (!row) {
    row = new EmployeeInfo(CREATE, newEmployeeId);
  }
  const [employeeData, setEmployeeData] = useState(row);

  return (
    <TableRow
      onMouseEnter={() => dispatchEditMenu({ type: SHOW_EDIT_OPTION })}
      onMouseLeave={() => dispatchEditMenu({ type: HIDE_EDIT_OPTION })}>
      <TableCell>
        {/* name fields */}
        {employeeData.io === READ ? (
          row.fullName
        ) : (
          <TextField
            name="fullName"
            defaultValue={row.fullName}
            onChange={e => {
              handleDataUpdate(e, employeeData, setEmployeeData);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {/* role fields */}
        {employeeData.io === READ ? (
          row.role
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
        {row.io === READ ? (
          new Date(row.startDate).toLocaleDateString('en-us')
        ) : (
          <DatePickers
            defaultTime={row.startDate}
            name="startDate"
            handle={e => {
              handleDataUpdate(e, employeeData, setEmployeeData, 'startDate', e.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {isValidData(employeeData) && employeeData.io !== READ ? (
          // TODO: valid check to show
          <CheckIcon
            className={classes.icon}
            onClick={e => {
              if (employeeData.io === CREATE) {
                setNewEmployeeId(id => {
                  return id + 1;
                });
                dispatchEmployees({ type: CREATE, data: employeeData });
                setEmployeeData(new EmployeeInfo(CREATE, newEmployeeId + 1));
              } else {
                dispatchEmployees({ type: READ, id: idx });
              }
            }}
          />
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
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── TIMEOFFROW ─────────────────────────────────────────────────────────────────
//
export function TimeOffRow({ idx, row, nameSuggestions, newVacationId, setNewVacationId, nameIdTable }) {
  if (!row) {
    row = new TimeOffInfo(CREATE, newVacationId);
  }
  const { io, fullName, timeOffStart, timeOffEnd } = row;
  const classes = useStyles();
  const [editMenu, dispatchEditMenu] = useReducer(editMenuReducer, false);
  const { dispatchVacations } = useContext(VacationContext);
  const [vacationData, setVacationData] = useState(row);

  return (
    <TableRow
      onMouseEnter={() => dispatchEditMenu({ type: SHOW_EDIT_OPTION })}
      onMouseLeave={() => dispatchEditMenu({ type: HIDE_EDIT_OPTION })}>
      <TableCell>
        {newVacationId ? (
          <Suggestion
            name="fullName"
            callBack={eventValue => {
              handleDataUpdate(null, vacationData, setVacationData, 'employeeId', nameIdTable[eventValue]);
            }}
            {...{ suggestions: nameSuggestions, defaultVal: '', placeholder: 'Search Employee' }}
          />
        ) : (
          fullName + '  ' + (isOnVacation(row) ? String.fromCodePoint(9969) : '')
        )}
      </TableCell>
      <TableCell>
        {/* time fields */}
        {io === READ ? (
          new Date(timeOffStart).toLocaleDateString('en-us')
        ) : (
          <DatePickers
            defaultTime={timeOffStart}
            name="timeOffStart"
            handle={e => {
              handleDataUpdate(e, vacationData, setVacationData, 'timeOffStart', e.target.value);
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
            name="timeOffEnd"
            handle={e => {
              handleDataUpdate(e, vacationData, setVacationData, 'timeOffEnd', e.target.value);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {isValidData(vacationData) && io !== READ ? (
          // TODO: valid check to show
          <CheckIcon
            className={classes.icon}
            onClick={() => {
              if (io === CREATE) {
                console.log('create called');
                setNewVacationId(id => {
                  return id + 1;
                });
                dispatchVacations({ type: CREATE, data: vacationData });
                setVacationData(new TimeOffInfo(CREATE, newVacationId + 1));
              } else {
                dispatchVacations({ type: READ, id: idx });
              }
            }}
          />
        ) : editMenu ? (
          <>
            <EditIcon
              className={classes.icon}
              onClick={() => dispatchVacations({ type: UPDATE, id: idx, data: vacationData })}
            />
            <DeleteIcon className={classes.icon} onClick={() => dispatchVacations({ type: DELETE, id: idx })} />
          </>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
