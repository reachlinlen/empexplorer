import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'

import InputField from '../../components/InputField'
import { BASE_URL } from '../../utilities/constants'

export default function Home() {
  const BOSS = "John Hartman"
  const [empList, setEmpList] = useState({})

  useEffect(() => {
    Axios.get(`${BASE_URL}/${BOSS}`)
      .then(res => {
        const directReportees = res.data[1]['direct-subordinates']
        let value = directReportees
        getAllSubordinates(value).then(res => {
          let finalList = {}
          res.forEach(emp => {
            if (finalList[emp[0]] === undefined) {
              finalList[emp[0]] = Array.of(emp)
            } else {
              if (finalList[emp[0]].indexOf(emp) === -1) {
                finalList[emp[0]].push(emp)
              }
            }
          })
          setEmpList({
            directReportees: value,
            nonDirectReportees: Object.values(finalList).flat()
          })
        })
      })
  }, [])

  async function getAllSubordinates(directReportees) {
    return await Promise.all(directReportees.map(boss => Axios.get(`${BASE_URL}/${boss}`)))
      .then(val => {
        let currList = []
        val.forEach(emp => {
          if (emp.data[1] !== undefined) {
            currList.push(emp.data[1]['direct-subordinates'])
          }
        })
        if (currList.length > 0) {
          let newEmps = currList.flat()
          return getAllSubordinates(newEmps).then(res => {
            if (res.length > 0) {
              newEmps.push(...res)
            }
            return newEmps
          })
        }
        return []
      })
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
          <InputField />
        </Box>
      </Grid>
    </Grid>
  )
}
