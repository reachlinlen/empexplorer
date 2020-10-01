import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'

import InputField from '../../components/InputField'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory();

  const handleSearch = (empName) => {
    history.push({
      pathname: `/overview/${empName}`
    });
  }

  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="h2">
          Employee Explorer
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Box component="span" pt={5}>
          <InputField
            label="Employee Name"
            placeholder="Search for SubOrdinates"
            handleIcon={handleSearch}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
