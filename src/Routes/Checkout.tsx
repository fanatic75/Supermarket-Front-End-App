import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CustomerForm from '../Components/CustomerForm';
import Review from '../Components/Review';
import axios from "axios";
import * as Config from "../Config.json";
import errorHandler from '../Services/errorHandler';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Customer Information', 'Review your order'];



export default function Checkout(props: any) {

    React.useEffect(()=>{
        console.log(props);
    },[props]);
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitOrder = () => {
        const sellProducts = async () => {
            try {
                let orders = null;
                if (props.location.state.products) {
                    orders = props.location.state.products.filter((product:any) => {
                        return product.noOfCopies > 0
                    }).map((product:any) => {
                        return {
                            productId:product.productId,
                            noOfCopies: product.noOfCopies - product.cartQuantity,
                        }
                    });
                }
                const token =  localStorage.getItem('token');
                if (token) {
                    const res = await axios.put(Config.APIURL+ '/products/' + props.location.state.branchId + '/quantity', {
                        products: orders,
    
    
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    if (res)
                        if (res.data)
                            if (res.data.message)
                                alert(res.data.message);
                }
    
            }
            catch (e) {
                errorHandler(e);
            }
        }

        sellProducts();
        props.history.push("/Home",{...props.location.state});
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <CustomerForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} />;
            case 1:
                return <Review products={props.location.state.products} branchId={props.location.state.branchId} firstName={firstName}  lastName={lastName} />;
            default:
                throw new Error('Unknown step');
        }
    }
    return (
        <React.Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography style={{ marginLeft: '45%' }} variant="h6" color="inherit" noWrap>
                        Supermarket System
          </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
          </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>

                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                </Typography>
                <Button color="primary" onClick={()=>submitOrder()}>
                    
                             Return to Home
                     </Button>
                
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                    </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}