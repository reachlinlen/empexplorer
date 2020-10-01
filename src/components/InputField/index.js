import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './InputField.styles'

function InputField(props) {
  const { label, placeholder, handleIcon } = props
  const [empName, setEmpName] = useState('')

  const classes = useStyles()

  const handleSearch = (e) => {
    handleIcon(empName)
  }

  const handleChange = (e) => {
    setEmpName(e.target.value)
  }

  return (
    <TextField
      label={label}
      variant="outlined"
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <IconButton type="submit" aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        )
      }}
      className={classes.root}
      onChange={handleChange}
    />
  )

}

export default InputField