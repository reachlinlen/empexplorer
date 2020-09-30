import React from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './InputField.styles'

function InputField() {

  const classes = useStyles()

  return (
    <TextField
      label="Boss"
      variant="outlined"
      placeholder="Search for SubOrdinates"
      InputProps={{
        endAdornment: (
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        )
      }}
      className={classes.root}
    />
  )

}

export default InputField