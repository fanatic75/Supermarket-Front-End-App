import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        margin:25
    },
    
    remove_add:{
        display:'flex',
        alignItems: 'center',
        borderColor: 'Blue',
        marginRight:"4%",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        padding: 3
    },
    
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Product(props: any) {
    const classes = useStyles();
    const {products} = props;
    const addQuantity = () => {
        if (props.cartQuantity.toString() < props.noOfCopies) {
            const tempArray=[...products];
            tempArray[props.index]['cartQuantity']=props.cartQuantity+1;
            tempArray[props.index]['isAddPressed']=true;


            props.setProducts(tempArray);
        }
        else
            alert('Cannot sell more than stock quantity');


    }


    const deleteQuantity = () => {
        const tempArray=[...products];
        if (props.cartQuantity < 2) {
            tempArray[props.index]['isAddPressed']=false;
            tempArray[props.index]['cartQuantity']=0;

            
        }
        else
        tempArray[props.index]['cartQuantity']=props.cartQuantity-1;
        props.setProducts(tempArray);
    }

    return (
        <Card className={classes.card}>
            <CardContent>
            <Typography variant="h5" component="h2">
                   {props.productName}
        </Typography>
                <Typography variant="h6" component="h5">
                   Quantity Available
        </Typography>
                <Typography className={classes.pos} >
                    {props.noOfCopies}
        </Typography>
                <Typography variant="body2" component="p">
                    Price per piece
          <br />
                    {props.price}
                </Typography>
            </CardContent>
            <CardActions >
                <div style={{marginLeft:'44%',}}>
                {!props.isAddPressed ? <Button onClick={() => addQuantity()} color="primary" size="large">Add</Button>
                    : <div className={classes.remove_add}>
                        <IconButton onClick={deleteQuantity} >
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="h5" component="h2">
                            {props.cartQuantity
        }
                        </Typography>
                        <IconButton onClick={addQuantity} aria-label="Add" >
                            <AddIcon />
                        </IconButton>
                    </div>}
                    </div>
            </CardActions>
        </Card>
    );
}