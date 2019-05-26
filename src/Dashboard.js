import React, { useReducer, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems } from './listItems';
import { Employees, TimeOff } from './Employees';
import { useStyles } from './useStyles';
import { employeeData, vacationData } from './InitData';
import { IO_OPTIONS, SORT_OPTIONS, removeRow } from './utils';
import { VIEWS } from './listItems';
const { CREATE, READ, UPDATE, DELETE } = IO_OPTIONS;
const { SORT_BY_FULLNAME, SORT_BY_ROLE, SORT_BY_STARTDATE, SORT_BY_TIMEOFFSTART, SORT_BY_TIMEOFFEND } = SORT_OPTIONS;

//
// ─── CREATING CONTEXTS ──────────────────────────────────────────────────────────
//

export const EmployeeContext = React.createContext();
export const VacationContext = React.createContext();

//
// ─── DEFINING DRAWER REDUCERS ───────────────────────────────────────────────────
//
const DRAWER_OPEN = 'OPEN';
const DRAWER_CLOSE = 'CLOSE';
const drawerReducer = (state, action) => {
  switch (action.type) {
    case DRAWER_OPEN:
      return true;
    case DRAWER_CLOSE:
      return false;
    default:
      return state;
  }
};

//
// ─── BOARVIEW REDUCER DEFINITION ────────────────────────────────────────────────────────
//
const { EMPLOYEES, TIMEOFF } = VIEWS;

const viewReducer = (state, action) => {
  switch (action.type) {
    case EMPLOYEES:
      return EMPLOYEES;
    case TIMEOFF:
      return TIMEOFF;
    default:
      return state;
  }
};

//
// ─── MAIN STATE REDUCER ─────────────────────────────────────────────────────────
//
const reducer = (state, action) => {
  switch (action.type) {
    case CREATE:
      if (action.data) {
        state.unshift(action.data);
      }
      return state;
    case UPDATE:
      if (typeof action.id === 'number') {
        const RowToEdit = state[action.id];
        if (RowToEdit.io !== UPDATE) {
          RowToEdit.io = UPDATE;
          return state;
        }
      }
      return state;
    case READ:
      if (typeof action.id === 'number') {
        const RowToEdit = state[action.id];
        if (RowToEdit.io !== READ) {
          RowToEdit.io = READ;
          return state;
        }
      }
      return state;
    case DELETE:
      if (typeof action.id === 'number') {
        return removeRow(state, action.id);
      }
      return state;
    case SORT_BY_FULLNAME:
      state.sort((a, b) => ('' + a.fullName).localeCompare(b.fullName));
      return state;
    case SORT_BY_ROLE:
      state.sort((a, b) => ('' + a.role).localeCompare(b.role));
      return state;
    case SORT_BY_STARTDATE:
      state.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      return state;
    case SORT_BY_TIMEOFFSTART:
      state.sort((a, b) => new Date(a.timeOffStart) - new Date(b.timeOffStart));
      return state;
    case SORT_BY_TIMEOFFEND:
      state.sort((a, b) => new Date(a.timeOffEnd) - new Date(b.timeOffEnd));
      return state;
    default:
      return state;
  }
};

//
// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────────
//
export default function Dashboard() {
  const classes = useStyles();
  const [isDrawerOpen, dispatchDrawer] = useReducer(drawerReducer, true);
  const [view, dispatchView] = useReducer(viewReducer, EMPLOYEES);
  const [employees, dispatchEmployees] = useReducer(reducer, employeeData);
  const [vacations, dispatchVacations] = useReducer(reducer, vacationData);
  const [newEmployeeId, setNewEmployeeId] = useState(10);
  const [newVacationId, setNewVacationId] = useState(10);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={() => dispatchDrawer({ type: DRAWER_OPEN })}
            className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Employee Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose)
        }}
        open={isDrawerOpen}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => dispatchDrawer({ type: DRAWER_CLOSE })}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems {...{ dispatchView }} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Conditional View Selection */}
            {
              {
                [EMPLOYEES]: (
                  <EmployeeContext.Provider value={{ employees, dispatchEmployees, newEmployeeId, setNewEmployeeId }}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Employees />
                      </Paper>
                    </Grid>
                  </EmployeeContext.Provider>
                ),
                [TIMEOFF]: (
                  <VacationContext.Provider
                    value={{ employees, vacations, dispatchVacations, newVacationId, setNewVacationId }}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <TimeOff />
                      </Paper>
                    </Grid>
                  </VacationContext.Provider>
                )
              }[view]
            }
          </Grid>
        </Container>
      </main>
    </div>
  );
}
