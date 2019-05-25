import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import WorkOffIcon from '@material-ui/icons/WorkOff';
export const VIEWS = {
  EMPLOYEES: 'EMPLOYEES',
  TIMEOFF: 'TIMEOFF'
};

const { EMPLOYEES, TIMEOFF } = VIEWS;

export const MainListItems = ({ dispatchView }) => (
  <div>
    <ListItem button onClick={() => dispatchView({ type: EMPLOYEES })}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem button onClick={() => dispatchView({ type: TIMEOFF })}>
      <ListItemIcon>
        <WorkOffIcon />
      </ListItemIcon>
      <ListItemText primary="Time Off" />
    </ListItem>
  </div>
);
