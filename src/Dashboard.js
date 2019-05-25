import React, { useReducer, useEffect } from 'react';
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
import { employeeRows, employeeRowsArr, vacationRows, names, vacationData } from './InitData';
import { EmployeeInfo, roles, IO_OPTIONS } from './utils';
import { VIEWS } from './listItems';
const { READ, EDIT, DELETE } = IO_OPTIONS;

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

// Defining reducer for employee and vacation views
const reducer = (state, action) => {
  switch (action.type) {
    case EDIT:
      if (typeof action.id === 'number') {
        const RowToEdit = state.get(action.id);
        if (RowToEdit.io !== EDIT) {
          RowToEdit.io = EDIT;
          return state;
        }
      }
      return state;
    case DELETE:
      if (typeof action.id === 'number') {
        state.delete(action.id);
        console.log('delete called');
        console.log('state', state);
        return state;
      }
      return state;
    case READ:
      if (typeof action.id === 'number') {
        const RowToEdit = state.get(action.id);
        if (RowToEdit.io !== READ) {
          RowToEdit.io = READ;
          return state;
        }
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
  const [employees, dispatchEmployees] = useReducer(reducer, employeeRowsArr);
  const [vacations, dispatchVacations] = useReducer(reducer, vacationData);

  useEffect(() => {
    console.log('calling force Update');
    return () => {
      Employees.forceUpdate();
    };
  }, [employees]);
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
                  <EmployeeContext.Provider value={{ employees, dispatchEmployees }}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Employees />
                      </Paper>
                    </Grid>
                  </EmployeeContext.Provider>
                ),
                [TIMEOFF]: (
                  <EmployeeContext.Provider value={{ employees }}>
                    <VacationContext.Provider value={{ vacations, dispatchVacations }}>
                      <Grid item xs={12}>
                        <Paper className={classes.paper}>
                          <TimeOff />
                        </Paper>
                      </Grid>
                    </VacationContext.Provider>
                  </EmployeeContext.Provider>
                )
              }[view]
            }
          </Grid>
        </Container>
      </main>
    </div>
  );
}
