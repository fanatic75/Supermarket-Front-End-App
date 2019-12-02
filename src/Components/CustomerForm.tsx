import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
export default function PaymentForm(props:any) {
    
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Enter  Customer Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            { 
            //@ts-ignore
          <TextField value={props.lastName} onChange={(e)=>props.setLastName(e.target.value)} required id="lastcustomername" label="Last Name of Customer" fullWidth />
            }
          </Grid>
        <Grid item xs={12} md={6}>
          <TextField value={props.firstName} onChange={(e)=>props.setFirstName(e.target.value)} required id="firstcustomername" label="First Name of Customer" fullWidth />
        </Grid>
        
       
        
      </Grid>
    </React.Fragment>
  );
}