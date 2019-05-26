import React, { useReducer, useEffect, useState } from 'react';
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
import { IO_OPTIONS, removeRow, getIDset } from './utils';
import { VIEWS } from './listItems';
const { CREATE, READ, UPDATE, DELETE } = IO_OPTIONS;

// Creating Contexts
export const EmployeeContext = React.createContext();
export const VacationContext = React.createContext();

// Defining Drawer Reducers
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

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE:
      if (action.data) {
        console.log('create called with data:', action.data);
        // const newState = [...state];
        state.unshift(action.data);
        console.log('newState', state);
        // return newState;
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
    default:
      return state;
  }
};

// Boarview Definition

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

export default function Dashboard() {
  const classes = useStyles();

  const [isDrawerOpen, dispatchDrawer] = useReducer(drawerReducer, true);
  const [view, dispatchView] = useReducer(viewReducer, EMPLOYEES);
  const [employees, dispatchEmployees] = useReducer(reducer, employeeData);
  const [vacations, dispatchVacations] = useReducer(reducer, vacationData);
  const [employeeIDs, setEmployeeIDs] = useState(getIDset(employees));
  const [newEmployeeId, setNewEmployeeId] = useState(10);
  const [newVacationId, setNewVacationId] = useState(10);

  useEffect(() => {
    setEmployeeIDs(getIDset(employees));
    // setNewEmployeeId(newEmployeeId => newEmployeeId + 1);
    // console.log('newEmployeeId', newEmployeeId);
    console.log('hi');
  }, [employees, newEmployeeId]);

  useEffect(() => {
    // setNewVacationId(newVacationId => newVacationId + 1);
    // console.log('newVacationId', newVacationId);
    console.log('hi');
  }, [newVacationId, vacations]);

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
                    value={{ employeeIDs, employees, vacations, dispatchVacations, newVacationId, setNewVacationId }}>
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
