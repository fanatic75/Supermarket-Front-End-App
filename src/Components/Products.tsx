import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

import * as Config from '../Config.json';

import errorHandler from '../Services/errorHandler';
import { useHistory } from 'react-router';
const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Products() {
    const classes = useStyles();
    const history = useHistory();
    const [products,setProducts]= React.useState([]);
    const [loading,setLoading]=React.useState(false);
    useEffect(()=>{
        const fetchOrders = async ()=>{
            setLoading(true);
            try {
                
    
                
                const token =  localStorage.getItem('token');
                if (token) {
    
                    const res = await axios.get(Config.APIURL + '/products/all', {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    if (res)
                        if (res.data)
                            if (res.data) {
                                setProducts(res.data);
                            }
                    setLoading(false);
                    return;
                }
                localStorage.clear();
                history.push('/');
                throw 'No Token Found';
            } catch (error) {
                setLoading(false);
                errorHandler(error);
            }
        }
        fetchOrders();
    },[]);




    
 
    



    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>

                Products 


               </Typography>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity Available</TableCell>
                        <TableCell >Branch Name</TableCell>
                        <TableCell align="right">Product Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products&&products.map((product:any) => (
                        <TableRow key={product.productName}>
                            <TableCell>{product.productName}</TableCell>
                            
                            <TableCell>{product.noOfCopies}</TableCell>
                            
                            <TableCell>{product.branchName}</TableCell>
                            
                            <TableCell align="right">{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
           
        </React.Fragment>
    );
}