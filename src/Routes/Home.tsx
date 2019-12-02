import React ,{useEffect,useState,useCallback} from 'react';
import AppBar from '@material-ui/core/AppBar';
import * as Config from '../Config.json';
import errorHandler from '../Services/errorHandler';
import { createStyles, fade, useTheme,Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Loading from '../Components/Loading';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import EmployeeDrawer from '../Components/EmployeeDrawer';
import Product from '../Components/Product';
import { Button } from '@material-ui/core';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>



  createStyles({
    root: {
      flexGrow: 1,

    },drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },  appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
      }, menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      }, toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
  
    title: {
      flexGrow: 1,
      display: 'none',
      marginLeft:100,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 220,
        },
      },
    },
  }),
);

export  function wait(timeout:number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Home (props : any){
    const classes = useStyles();
    const { container } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let empId =props.location.state&&props.location.state.empId&& props.location.state.empId;

    let branchId =props.location.state&&props.location.state.branchId&& props.location.state.branchId;
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts]:any  = useState(null);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    

      useEffect(()=>{
        console.log("page entered");
      },[])

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            

            
            const token =  localStorage.getItem('token');
            if (token) {

                const res = await axios.get(Config.APIURL + '/products/' + branchId + '/branch', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (res)
                    if (res.data)
                        if (res.data) {
                            const productStateInitial = res.data.map((product:any) => {
                                return {
                                    isAddPressed: false,
                                    cartQuantity: 0,
                                    ...product,
                                }
                            });
                            setProducts(productStateInitial);
                        }
                setLoading(false);
                return;
            }
            localStorage.clear();
            props.history.push('/');
            throw 'No Token Found';
        } catch (error) {
            setLoading(false);
            errorHandler(error);
        }
    }, [branchId]);


    useEffect(() => {
        wait(2000).then(()=>{
            fetchProducts();
        }).catch(err=>console.log(err));
    }, [fetchProducts])
    
 
    
  
    const productExists = (product:any) => {
        return product.productName.toLowerCase().includes(searchQuery.trim().toLowerCase());
    }

    return (
        <>
        <div className={classes.root}>
           <AppBar position="static">
           <Toolbar>
           <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

           <Typography className={classes.title} variant="h6" noWrap>
            Supermarket System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Your Products"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange = {event=>setSearchQuery(event.target.value)}
              value={searchQuery}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          </Toolbar >

           </AppBar>
           <nav className={classes.drawer} aria-label="App Drawer">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <EmployeeDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <EmployeeDrawer />
          </Drawer>
        </Hidden>
      </nav>
          
            </div>
            {loading?<Loading />:<Container maxWidth="sm">
             {
                 products!==null && products.map((product:any, index :number)=>{
                    if(searchQuery){
                        if(productExists(product)){
                            if(product.noOfCopies!==0)
                                return <Product key={product.productId} productName={product.productName} noOfCopies = {product.noOfCopies} isAddPressed={product.isAddPressed} products={products} setProducts={setProducts} index={index} cartQuantity={product.cartQuantity}  />
                        } else {
                            return null;
                        }
                    } else {
                        if (product.noOfCopies!==0){
                            return <Product key={product.productId} productName={product.productName} noOfCopies = {product.noOfCopies} isAddPressed={product.isAddPressed} products={products} setProducts={setProducts} index={index} cartQuantity={product.cartQuantity}/>
                        }
                    }
                 })
             }

             {
                 products&& products.some((product:any)=> product.isAddPressed===true)&&<Button onClick={()=>{console.log({products,});props.history.push('/Checkout',{products,branchId:props.location.state.branchId,empId:props.location.state.empId})}}>Checkout </Button>
             }
          </Container>}
          </>

    )
}