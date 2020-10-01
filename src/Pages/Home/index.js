import React from 'react'
import Typography from '@material-ui/core/Typography'

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
    <div class="max-w-screen-lg mx-auto grid place-content-evenly mt-16">
      <Typography variant="h2">
        Employee Explorer
      </Typography>
      <div class="mt-32">
        <InputField
          label="Employee Name"
          placeholder="Search for SubOrdinates"
          handleIcon={handleSearch}
          autoFocus
        />
      </div>
    </div>
  )
}
