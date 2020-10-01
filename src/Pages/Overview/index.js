import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

import { BASE_URL } from '../../utilities/constants'

function Overview() {
  let { name } = useParams()
  console.log({ name })
  const [empList, setEmpList] = useState({
    directReportees: [],
    nonDirectReportees: []
  })

  useEffect(() => {
    Axios.get(`${BASE_URL}/${name}`)
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
    <>
      <Typography variant="h2">Employee Overview</Typography>
      <Typography variant="h5">Subordinates of Employee {name}</Typography>
      {

        empList['directReportees'].length > 0 &&
        <>
          <Typography variant="h6">Direct Subordinates</Typography>
          <ul>
            {
              empList['directReportees'].map(emp => <li key={emp}><Typography variant="subtitle1">{emp}</Typography></li>)
            }
          </ul>
        </>
      }
      {
        empList['nonDirectReportees'].length > 0 &&
        <>
          <Typography variant="h6">Non Direct Subordinates</Typography>
          <ul>
            {
              empList['nonDirectReportees'].map(emp => <li key={emp}><Typography variant="subtitle1">{emp}</Typography></li>)
            }
          </ul>
        </>
      }
    </>
  )
}

export default Overview