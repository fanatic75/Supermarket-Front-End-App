import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles(
    //@ts-ignore
    theme => ({
        //@ts-ignore
    listItem: {
        //@ts-ignore
      padding: theme.spacing(1, 0),
        //@ts-ignore
    },
    //@ts-ignore
    total: {
        //@ts-ignore
      fontWeight: '700',
      //@ts-ignore
    },
    //@ts-ignore
    title: {
        //@ts-ignore
      marginTop: theme.spacing(2),
        //@ts-ignore
    },
  }));
export default function Review(props:any) {

    
  const classes = useStyles();
    const calculatePrice :()=> number = ()=>{
        let value = 0;
        props.products.map((product:any)=>{
            if(product.isAddPressed){
                
            value += parseInt(product.price ) *parseInt(product.cartQuantity);
            return ;
            }
        });
        return value;
        
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {props.products.map((product:any) => {
            if(product.isAddPressed){
                return  <ListItem className={classes.listItem} key={product.productName}>
                <ListItemText primary={`${product.productName} x ${product.cartQuantity}`} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            } else {
                return null
            }
         
        }
        )}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {calculatePrice()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Customer Info
          </Typography>
          <Typography gutterBottom>{props.firstName + " "+ props.lastName}</Typography>
          
        </Grid>
       
        </Grid>
     
    </React.Fragment>
  );
}