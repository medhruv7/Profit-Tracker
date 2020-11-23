import './App.css';
import { DataGrid } from '@material-ui/data-grid'
import { Box, Container, Grid, makeStyles, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'

function createData(day) {
  return {day};
}

const rows = [
  createData('Monday'),
  createData('Tuesday'),
  createData('Wednesday'),
  createData('Thursday'),
  createData('Friday'),
];

function SetDailyTarget({daily_target, setDailyTarget, currency, setCurrency, currencies, currencySymbol}){
  
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleOnChangeDailyTarget = (event) => {
    setDailyTarget(event.target.value);
  }

  return(
    <Grid container spacing={0}>
      <Grid item xs={0}>
        <TextField 
          id="daily-pnl" 
          label="Daily Profit Target" 
          value={daily_target} 
          variant="filled"
          onChange={handleOnChangeDailyTarget}
          type="number"
          >
        </TextField>
      </Grid>
      <Grid item xs={0}>
        <TextField 
          id="currency-selected" 
          select
          // label="Currency" 
          value={currency} 
          onChange={handleChange}
          // helperText="Please select your currency for further calculations"
          variant="filled"
          >
            {currencies.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs = {4} style={{marginLeft:"20px", marginTop:"20px"}}>
        Weekly Profit Target : { 5*daily_target } {currencySymbol}
      </Grid>
    </Grid>
  )
}

function MakeTable({profitLoss, setProfitLoss, daily_target, currencySymbol}){
 

  const onChangePnLHandler = idx => e => {
    let newArr = [...profitLoss]
    newArr[idx] = parseInt(e.target.value)
    setProfitLoss(newArr)
  }

  return(
  <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Profit/Loss</TableCell>
            <TableCell>Difference From Daily Target ( in {currencySymbol} ) </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={row.day}>
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell>
                <TextField id="pnl" onChange={onChangePnLHandler(idx)}></TextField> {currencySymbol}
              </TableCell>
              <TableCell>
                {Math.max(0, daily_target - profitLoss[idx])} {currencySymbol}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function App() {

  const currencies = [
    {
      value: 'INR',
      label: '₹'  
    },
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [profitLoss, setProfitLoss] = useState([0,0,0,0,0]);
  const [dailyTarget, setDailyTarget] = useState(0);
  const [currency, setCurrency] = useState('INR')
  const weekly_target = 5*dailyTarget;

  var currencySymbol = ''
  currencies.map(item => {
    if(item.value === currency){
      currencySymbol = item.label
    }
  })

  console.log("currency" + currency)
  return(
    <div>
      <SetDailyTarget daily_target={dailyTarget} setDailyTarget={setDailyTarget} currency={currency} setCurrency={setCurrency} currencies={currencies} currencySymbol={currencySymbol}/>
      <MakeTable profitLoss={profitLoss} setProfitLoss={setProfitLoss} daily_target={dailyTarget} currencySymbol={currencySymbol}/>
      <Grid container spacing = {3} style={{justifyContent: 'center', marginTop: "10px"}}>
        <Grid item xs={4} m = {1}>
              Total Profit/Loss For This Week is : {profitLoss.reduce((a, b) => a + b, 0)} {currencySymbol}
        </Grid>
        <Grid item xs={4} m = {1}>
              Difference From Weekly Target : {Math.max(0,weekly_target - profitLoss.reduce((a,b) => a + b, 0))} {currencySymbol}
        </Grid>
      </Grid>
  </div>
  )
}

export default App;
