import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loading from '../Components/Loading';
import { useHistory } from "react-router-dom";
import * as Config from '../Config.json';
import axios from 'axios';
import errorHandler from '../Services/errorHandler';

const authenticate: string = '/employees/authenticate';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    let history = useHistory();


    useEffect(() => {
        let empId :string|null= null;
        let branchId  : string|null= null;
        async function isLoggedIn() {
            const login =  localStorage.getItem('login');
            const role =  localStorage.getItem('role');
            branchId =  localStorage.getItem('branchId');
            empId =  localStorage.getItem('empId');
            if (login)
                return { empId, login, role, branchId };
            return false;
        }
        isLoggedIn()
            .then((res) => {
                if (res && res.login) {
                    if (res.role === 'Admin')
                       history.push('Admin',{  empId });
                    else {
                        history.push('Home', { branchId, empId });
                    }

                }
            }).catch(err => alert(err));



    }, [history]);
    const [username,setUsername]  = useState("");
    const [password,setPassword]  = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleAuthentication: () => void = async () => {
       
        if (username !== "" && password !== "") {
            
            setLoading(true);
            try {
                const res = await axios({
                    url: Config.APIURL + authenticate,
                    method: 'post',
                    data: {
                        username,
                        password,
                    }
                });
                setLoading(false);
                if (res) {
                    const importantData  = res.data;
                    importantData.login = 'true';
                    Object.keys(importantData).map(async (key) => {
                        
                             localStorage.setItem(key, importantData[key]);

                    });
                    setUsername("");
                    setPassword("");
                    const branchId = importantData.branchId;
                    const empId=importantData.empId
                    const role =  localStorage.getItem('role');
                    if(role==='Admin')
                    history.push('Admin', { empId,role });
                    else
                    history.push('Home', { branchId,empId });
                
                }
            }
            catch (e) {
                setLoading(false);
                errorHandler(e);
            }
            return;
        }
        alert('username or password cannot be empty');



    }


    return (
        <>
        { loading ? <Loading /> : <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
          </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onChange={(e)=>setUsername(e.target.value)}
                        value={username}
                        label="Username"
                        name="username"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={(e)=>setPassword(e.target.value)}
                        name="password"
                        label="Password"
                        value={password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                   
                    <Button
                        type="submit"
                        onClick={()=>handleAuthentication()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
            </Button>
                    
                </form>
            </div>

        </Container> }
        </>
    );
}