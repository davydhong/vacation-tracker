import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import WorkOffIcon from '@material-ui/icons/WorkOff'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WorkOffIcon />
      </ListItemIcon>
      <ListItemText primary="Time Off" />
    </ListItem>
  </div>
);

