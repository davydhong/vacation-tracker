import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

function DatePickers({ defaultTime, handle }) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        type="date"
        defaultValue={defaultTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handle}
      />
    </form>
  );
}

export default DatePickers;
